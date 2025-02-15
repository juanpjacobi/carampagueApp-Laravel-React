<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActualizarHorasRequest;
use App\Http\Requests\AsignarAsociadoRequest;
use App\Http\Requests\StoreLineaServicioRequest;
use App\Http\Requests\ToggleLineaServicioRequest;
use App\Http\Requests\UpdateLineaServicioRequest;
use App\Http\Resources\LineaServicioCollection;
use App\Http\Resources\LineaServicioResource;
use App\Http\Resources\MotivoResource;
use App\Models\LineaServicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LineaServicioController extends Controller
{

    public function index()
    {
        $lineasServicio = new LineaServicioCollection(LineaServicio::all());
        return response()->json(['lineasServicio' => $lineasServicio]);
    }


    public function store(StoreLineaServicioRequest $request)
    {
        $data = $request->validated();

        $linea = LineaServicio::crearLinea($data);

        return response()->json([
            'message' => 'Línea creada exitosamente.',
            'linea' => new LineaServicioResource($linea),
        ]);
    }



    public function show(LineaServicio $lineaServicio) {}


    public function update(UpdateLineaServicioRequest $request, LineaServicio $lineas_servicio)
    {
        $data = $request->validated();

        $lineas_servicio->actualizarLinea($data);

        return response()->json([
            'message' => 'Línea actualizada correctamente',
            'linea' => new LineaServicioResource($lineas_servicio),
        ]);
    }


    public function destroy($id)
    {
        try {
            $linea = LineaServicio::findOrFail($id);
            $linea->delete();

            return response()->json([
                'message' => 'Línea de servicio eliminada correctamente.',
                'linea_id' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error eliminando la línea de servicio: ' . $e->getMessage(),
                'exception' => get_class($e),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }
    public function asignarAsociado(AsignarAsociadoRequest $request, $id)
    {
        $linea = LineaServicio::findOrFail($id);
        $linea->asignarAsociado($request->validated()['asociado_id'] ?? null);

        return response()->json([
            'message' => 'Asociado asignado correctamente.',
            'linea' => new LineaServicioResource($linea),
        ]);
    }

    public function actualizarHoras(ActualizarHorasRequest $request, $id)
    {
        $linea = LineaServicio::findOrFail($id);
        $data = $request->validated();

        $linea->actualizarHoras($data['hora_real_inicio'] ?? null, $data['hora_real_fin'] ?? null);

        return response()->json([
            'message' => 'Horas actualizadas correctamente.',
            'linea' => new LineaServicioResource($linea),
        ]);
    }


    public function toggleValidado(ToggleLineaServicioRequest $request, $id)
    {
        $data = $request->validated();
        $linea = LineaServicio::findOrFail($id);

        // Evitar validar una línea sin asociado
        if ($data['is_validado'] === true && empty($linea->asociado_id)) {
            return response()->json([
                'message' => 'No se puede validar una línea sin asociado.'
            ], 422);
        }

        // Si se está revirtiendo la validación...
        if (isset($data['revertir']) && $data['revertir'] === true) {
            if ($linea->is_validado === false) {
                DB::transaction(function () use ($linea) {
                    $linea->motivos()->delete();
                    $linea->update([
                        'is_validado' => true,
                        'is_justificado' => null,
                    ]);
                });
                return response()->json([
                    'message' => 'Línea revertida correctamente.',
                    'linea' => new LineaServicioResource($linea),
                ]);
            }
            return response()->json(['message' => 'La línea no está invalidada.'], 422);
        }

        $nuevaLinea = null;
        $motivoCreado= null;

        // Crear nueva línea si es necesario (por ejemplo, al invalidar)
        if ($data['is_validado'] === false && $data['crear_linea_real']) {
            $nuevaLinea = $linea->crearNuevaLinea();
        }

        // Agregar motivo y actualizar is_validado
        if (isset($data['tipo_motivo_id'])) {
            $motivoCreado = $linea->agregarMotivo([
                'tipo_motivo_id' => $data['tipo_motivo_id'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);
        }

        $linea->update(['is_validado' => $data['is_validado']]);

        return response()->json([
            'message' => 'Línea actualizada correctamente.',
            'linea' => new LineaServicioResource($linea),
            'nueva_linea' => $nuevaLinea ? new LineaServicioResource($nuevaLinea) : null,
            'motivo' => $motivoCreado ? new MotivoResource($motivoCreado) : null,
        ]);
    }


    public function toggleJustificado(Request $request, $id)
    {
        $data = $request->validate([
            'is_justificado' => 'required|boolean'
        ]);

        $linea = LineaServicio::findOrFail($id);
        $linea->update([
            'is_justificado' => $data['is_justificado']
        ]);

        return response()->json([
            'message' => 'Justificación actualizada correctamente.',
            'linea' => new LineaServicioResource($linea)
        ], 200);
    }
}

