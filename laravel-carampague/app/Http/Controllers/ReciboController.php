<?php

namespace App\Http\Controllers;

use App\Models\Ajuste;
use App\Models\Recibo;
use App\Models\LineaRecibo;
use App\Models\LineaServicio;
use App\Models\Valor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class ReciboController extends Controller
{
    /**
     * Muestra la lista de recibos.
     */
    public function index(Request $request)
    {
        // Aquí puedes agregar filtros por asociado, periodo, etc.
        $recibos = Recibo::with(['lineas', 'asociado'])->get();
        return response()->json(['recibos' => $recibos], 200);
    }

    /**
     * Crea un nuevo recibo.
     */
    public function store(Request $request)
    {
        // Validamos la data mínima
        $data = $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'periodo'     => 'required|string',
            'linea_ids'   => 'required|array|min:1',
            'linea_ids.*' => 'exists:lineas_servicio,id',
            'ajuste_ids'  => 'nullable|array',
            'ajuste_ids.*' => 'exists:ajustes,id',
        ]);

        DB::beginTransaction();

        try {
            // Creamos el recibo base
            $recibo = Recibo::create([
                'asociado_id' => $data['asociado_id'],
                'periodo'     => $data['periodo'],
                'total'       => 0,
                'pdf_url'     => null,
            ]);

            $totalServicios = 0;

            // Recuperamos las líneas de servicio válidas (is_validado true)
            $lineasServicio = LineaServicio::whereIn('id', $data['linea_ids'])
                ->where('is_validado', true)
                ->get();

            $grouped = [];
            foreach ($lineasServicio as $linea) {

                $servicio = $linea->servicio;
                $cliente_id = $servicio->objetivo->cliente_id;

                $valorRecord = Valor::where('cliente_id', $cliente_id)
                    ->where('periodo', $data['periodo'])
                    ->first();

                if (!$valorRecord) {
                    throw new \Exception("No se encontró el valor de hora para el cliente {$cliente_id} en el periodo {$data['periodo']}.");
                }

                // Usamos el valor correcto (valor_vigilador)
                $valorHora = $valorRecord->valor_vigilador;

                // Definimos la clave de agrupación (podrías combinar con otra información si es necesario)
                $key = $valorHora;
                if (!isset($grouped[$key])) {
                    $grouped[$key] = [
                        'horas' => 0,
                        'valor_hora' => $valorHora,
                        'descripcion' => "Horas trabajadas a $valorHora", // O genera una descripción más detallada
                    ];
                }
                $grouped[$key]['horas'] += $linea->horas_reales;
            }

            // Creamos una línea de recibo por cada grupo
            foreach ($grouped as $g) {
                $subtotal = $g['horas'] * $g['valor_hora'];
                $lineaRecibo = new LineaRecibo([
                    'descripcion' => $g['descripcion'],
                    'horas'       => $g['horas'],
                    'valor_hora'  => $g['valor_hora'],
                    'subtotal'    => $subtotal,
                    'es_ajuste'   => false,
                ]);
                $lineaRecibo->recibo()->associate($recibo);
                $lineaRecibo->save();

                $totalServicios += $subtotal;
            }

 // Procesamos los ajustes
$totalAjustes = 0;
if (!empty($data['ajuste_ids'])) {
    // Recuperamos los ajustes (individuales y globales) y cargamos la relación 'tipoAjuste'
    $ajustes = Ajuste::with('tipoAjuste')
        ->whereIn('id', $data['ajuste_ids'])
        ->where(function ($query) use ($data) {
            $query->where(function($q) use ($data) {
                // Ajustes individuales: global = false y asociado_id igual al enviado
                $q->where('global', false)
                  ->where('asociado_id', $data['asociado_id']);
            })->orWhere('global', true);
        })
        ->get();

    foreach ($ajustes as $ajuste) {
        // Verificamos que la relación tipoAjuste esté cargada
        if (!$ajuste->tipoAjuste) {
            throw new \Exception("El ajuste con ID {$ajuste->id} no tiene tipo de ajuste asociado.");
        }
        // Obtenemos el monto: si está definido en el ajuste, lo usamos; si no, usamos el monto predeterminado del tipo
        $monto = $ajuste->monto ?? $ajuste->tipoAjuste->monto;

        // Aplicamos la lógica: si el ajuste es extra (add == true), se suma; si es descuento (add == false), se resta.
        if ($ajuste->tipoAjuste->add) {
            $totalAjustes += $monto;
        } else {
            $totalAjustes -= $monto;
        }

        // Creamos la línea de recibo para el ajuste
        $lineaRecibo = new LineaRecibo([
            'descripcion' => $ajuste->tipoAjuste->concepto,
            'horas'       => 0,
            'valor_hora'  => 0,
            'subtotal'    => $monto,
            'es_ajuste'   => true,
        ]);
        $lineaRecibo->recibo()->associate($recibo);
        $lineaRecibo->save();
    }
    $recibo->total = $totalServicios + $totalAjustes;

}


            // Generamos el PDF a partir de la vista Blade
            $pdf = PDF::loadView('recibos.pdf', compact('recibo'));
            $pdfName = 'recibo_' . $recibo->id . '.pdf';
            $pdfPath = 'recibos/' . $pdfName;
            Storage::disk('public')->put($pdfPath, $pdf->output());
            $recibo->pdf_url = Storage::url($pdfPath);
            $recibo->save();

            DB::commit();

            return response()->json(['recibo' => $recibo], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Muestra un recibo específico con sus líneas.
     */
    public function show($id)
    {
        $recibo = Recibo::with(['lineas', 'asociado'])->findOrFail($id);
        return response()->json(['recibo' => $recibo], 200);
    }

    /**
     * Actualiza un recibo existente.
     */
    public function update(Request $request, $id)
    {
        // La lógica de actualización dependerá de si permites modificar recibos generados.
        // Aquí se muestra un ejemplo básico.
        $data = $request->validate([
            'periodo' => 'sometimes|string',
            // Puedes permitir actualizar otros campos si es necesario.
        ]);

        $recibo = Recibo::findOrFail($id);
        $recibo->update($data);

        return response()->json(['recibo' => $recibo], 200);
    }

    /**
     * Elimina un recibo.
     */
    public function destroy($id)
    {
        $recibo = Recibo::findOrFail($id);
        $recibo->delete();

        return response()->json(['message' => 'Recibo eliminado correctamente'], 200);
    }
}
