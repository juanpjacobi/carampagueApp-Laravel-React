<?php

namespace App\Http\Controllers;

use App\Models\CarpetaMedica;
use App\Models\LineaServicio;
use App\Models\Valor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as PDF;


class CarpetasMedicasController extends Controller
{
    /**
     * Muestra la lista de carpetas médicas.
     */
    public function index(Request $request)
    {
        $carpetas = CarpetaMedica::all();
        return response()->json(['carpetas_medicas' => $carpetas], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'asociado_id' => 'required|exists:asociados,id',
            'periodo'     => 'required|string', // Ejemplo: "2025-02"
            'linea_ids'   => 'required|array|min:1',
            'linea_ids.*' => 'exists:lineas_servicio,id'
        ]);

        DB::beginTransaction();

        try {
            // Creamos el registro base en la carpeta médica con monto 0 y sin pdf_url
            $carpeta = CarpetaMedica::create([
                'asociado_id' => $data['asociado_id'],
                'periodo'     => $data['periodo'],
                'monto'       => 0,
            ]);

            $totalMonto = 0;

            $lineasServicio = LineaServicio::whereIn('id', $data['linea_ids'])
                ->where('is_justificado', true)
                ->get();

            foreach ($lineasServicio as $linea) {

                $servicio = $linea->servicio;
                $cliente_id = $servicio->objetivo->cliente_id;
                $objetivo_id = $servicio->objetivo->id;

                $valorRecord = Valor::where('cliente_id', $cliente_id)
                ->where('periodo', $data['periodo'])
                ->where('objetivo_id', $objetivo_id)
                ->first();

            if (!$valorRecord) {
                $valorRecord = Valor::where('cliente_id', $cliente_id)
                    ->where('periodo', $data['periodo'])
                    ->whereNull('objetivo_id')
                    ->first();
            }
            if (!$valorRecord) {
                throw new \Exception("No se encontró el valor de hora para el cliente {$cliente_id} en el período {$data['periodo']} y objetivo {$objetivo_id}.");
            }

                $valorHora = $valorRecord->valor_vigilador;
                $valorJustificado = $valorHora * 0.67;

                $horas = $linea->horas_reales;
                $subtotal = $valorJustificado * $horas;

                $totalMonto += $subtotal;
            }

            $carpeta->monto = $totalMonto;
            $carpeta->save();


            $pdf = PDF::loadView('carpetas_medicas.pdf', compact('carpeta'));
            $pdfName = 'carpeta_medica_' . $carpeta->id . '.pdf';
            $pdfPath = 'carpetas_medicas/' . $pdfName;
            Storage::disk('public')->put($pdfPath, $pdf->output());
            $carpeta->pdf_url = Storage::url($pdfPath);
            $carpeta->save();

            DB::commit();

            return response()->json(['carpeta_medica' => $carpeta], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    /**
     * Muestra el detalle de una carpeta médica.
     */
    public function show($id)
    {
        $carpeta = CarpetaMedica::with('asociado')->findOrFail($id);
        return response()->json(['carpeta_medica' => $carpeta], 200);
    }

    // Los métodos update() y destroy() se pueden implementar si es necesario.
}
