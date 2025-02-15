<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\LineaFactura;
use App\Models\LineaServicio;
use App\Models\Objetivo;
use App\Models\Valor;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facturas = Factura::all();
        return response()->json(['facturas' => $facturas], 200);
    }

    public function store(Request $request)
    {
        // Validamos la data mínima.
        $data = $request->validate([
            'objetivo_id' => 'required|exists:objetivos,id',
            'periodo'     => 'required|string',
            'linea_ids'   => 'required|array|min:1',
            'linea_ids.*' => 'exists:lineas_servicio,id',
        ]);

        DB::beginTransaction();

        try {
            // Obtenemos el objetivo y, a partir de él, el cliente.
            $objetivo = Objetivo::findOrFail($data['objetivo_id']);
            $cliente_id = $objetivo->cliente_id;
            $cliente = Cliente::findOrFail($cliente_id);

            // Creamos la factura base. La factura incluirá cliente_id, objetivo_id y el período.
            $factura = Factura::create([
                'cliente_id'  => $cliente_id,
                'objetivo_id' => $data['objetivo_id'],
                'periodo'     => $data['periodo'],
                'total'       => 0,
                'pdf_url'     => null,
            ]);

            $totalServiciosGross = 0;

            // Recuperamos las líneas de servicio válidas para facturación (is_planificado true)
            $lineasServicio = LineaServicio::whereIn('id', $data['linea_ids'])
                ->where('is_planificado', true)
                ->get();

            // Agrupamos las líneas por el valor de factura (usando valor_cliente)
            // Cada grupo tendrá: total horas, valor por hora y una descripción base.
            $grouped = [];
            foreach ($lineasServicio as $linea) {
                $servicio = $linea->servicio;

                // Verificamos que la línea pertenezca al objetivo seleccionado.
                if ($servicio->objetivo_id != $data['objetivo_id']) {
                    throw new \Exception("La línea de servicio con ID {$linea->id} no pertenece al objetivo seleccionado.");
                }

                // Buscamos el valor a cobrar para el cliente y período usando valor_cliente.
                $valorRecord = Valor::where('cliente_id', $cliente_id)
                ->where('periodo', $data['periodo'])
                ->where('objetivo_id', $data['objetivo_id'])
                ->first();

                if (!$valorRecord) {
                    // Si no hay registro especial para el objetivo, se toma el valor general (objetivo_id NULL)
                    $valorRecord = Valor::where('cliente_id', $cliente_id)
                        ->where('periodo', $data['periodo'])
                        ->whereNull('objetivo_id')
                        ->first();
                }
                if (!$valorRecord) {
                    throw new \Exception("No se encontró el valor de hora para el cliente {$cliente_id} en el período {$data['periodo']} y objetivo {$data['objetivo_id']}.");
                }

                $valorHora = $valorRecord->valor_cliente;

                // Agrupamos por valor; en este ejemplo usamos el valor como clave.
                $key = $valorHora;
                if (!isset($grouped[$key])) {
                    $grouped[$key] = [
                        'horas' => 0,
                        'valor_hora' => $valorHora,
                        'descripcion' => "Horas facturadas a $$valorHora",
                    ];
                }
                $grouped[$key]['horas'] += $linea->horas_reales;
            }

            // Ahora, según la condición impositiva del cliente, generamos las líneas de factura.
            if (strtolower($cliente->condicion_iva->nombre_condicion_iva) === 'responsable inscripto') {
                // Para responsables inscriptos, recalculamos cada grupo a base neta y agregamos IVA.
                $baseTotal = 0;
                foreach ($grouped as $key => &$g) {
                    $netValue = round($g['valor_hora'] / 1.21, 2);
                    $g['net_value'] = $netValue;
                    $g['net_subtotal'] = round($netValue * $g['horas'], 2);
                    $baseTotal += $g['net_subtotal'];
                }
                unset($g);

                // Calculamos el IVA a partir del total bruto.
                // El total bruto (gross) es la suma de los montos con el valor original.
                foreach ($grouped as $g) {
                    $subtotalGross = $g['horas'] * $g['valor_hora'];
                    $totalServiciosGross += $subtotalGross;
                }
                // La base neta debería ser igual a baseTotal y el IVA es la diferencia.
                $iva = round($totalServiciosGross - $baseTotal, 2);

                // Creamos líneas de factura para cada grupo, usando los valores netos.
                foreach ($grouped as $g) {
                    // En la descripción podemos incluir el valor original y el neto.
                    $descripcion = $g['descripcion'] . " (neto: $" . number_format($g['net_value'], 2) . ")";
                    $lineaFactura = new LineaFactura([
                        'descripcion' => $descripcion,
                        'horas'       => $g['horas'],
                        'valor_hora'  => $g['net_value'],
                        'subtotal'    => $g['net_subtotal'],
                    ]);
                    $lineaFactura->factura()->associate($factura);
                    $lineaFactura->save();
                }

                // Creamos una línea adicional para el IVA.
                $lineaIVA = new LineaFactura([
                    'descripcion' => "IVA 21%",
                    'horas'       => 0,
                    'valor_hora'  => 0,
                    'subtotal'    => $iva,
                ]);
                $lineaIVA->factura()->associate($factura);
                $lineaIVA->save();

                // El total de la factura será la suma de la base neta y el IVA, que equivale al total bruto.
                $factura->total = round($totalServiciosGross, 2);
            } else {
                // Para monotributistas, usamos la lógica original.
                foreach ($grouped as $g) {
                    $subtotal = $g['horas'] * $g['valor_hora'];
                    $lineaFactura = new LineaFactura([
                        'descripcion' => $g['descripcion'],
                        'horas'       => $g['horas'],
                        'valor_hora'  => $g['valor_hora'],
                        'subtotal'    => $subtotal,
                    ]);
                    $lineaFactura->factura()->associate($factura);
                    $lineaFactura->save();

                    $totalServiciosGross += $subtotal;
                }
                $factura->total = round($totalServiciosGross, 2);
            }

            $factura->save();

            // Generamos el PDF usando la vista Blade "facturas.pdf"
            $pdf = PDF::loadView('facturas.pdf', compact('factura'));
            $pdfName = 'factura_' . $factura->id . '.pdf';
            $pdfPath = 'facturas/' . $pdfName;
            Storage::disk('public')->put($pdfPath, $pdf->output());
            $factura->pdf_url = Storage::url($pdfPath);
            $factura->save();

            DB::commit();

            return response()->json(['factura' => $factura], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
