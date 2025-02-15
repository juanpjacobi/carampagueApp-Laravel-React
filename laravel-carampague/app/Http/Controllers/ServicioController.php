<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerarLineasRequest;
use App\Http\Requests\ObtenerTotalesPorAsociadoRequest;
use App\Http\Requests\ObtenerTotalRequest;
use App\Http\Requests\ServicioRequest;
use App\Http\Resources\LineaServicioResource;
use App\Http\Resources\ServicioCollection;
use App\Http\Resources\ServicioResource;
use App\Models\Feriado;
use App\Models\LineaServicio;
use App\Models\Servicio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    public function index()
    {
        $servicios = Servicio::with(['lineas.asociado', 'modalidades', 'lineas.motivos.tipoMotivo'])->get();
        return response(['servicios' => ServicioResource::collection($servicios)]);
    }

    public function store(ServicioRequest $request)
    {
        try {
            $data = $request->validated();
            $servicio = Servicio::crearConModalidades($data);

            return response()->json([
                'message' => 'Servicio y modalidades creados exitosamente.',
                'servicio' => new ServicioResource($servicio),
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el servicio: ' . $e->getMessage()], 500);
        }
    }

    public function generarLineas(GenerarLineasRequest $request, $id)
    {
        $data = $request->validated();

        $servicio = Servicio::with('modalidades')->findOrFail($id);
        $feriados = Feriado::pluck('fecha')->toArray();

        $fechaInicio = Carbon::parse($data['fecha_inicio_servicio']);
        $fechaFin = Carbon::parse($data['fecha_fin_servicio']);
        $lineas = [];

        while ($fechaInicio->lte($fechaFin)) {
            $esFeriado = in_array($fechaInicio->toDateString(), $feriados);
            $diaSemana = $fechaInicio->dayOfWeek;

            if ($esFeriado) {
                // Buscar todas las modalidades de feriado (suponiendo que tenemos modalidades específicas para feriados)
                $modalidadesFeriado = $servicio->modalidades->where('dia_semana', 7); // Para el día 7 (domingo, o el día que representes como feriado)

                if ($modalidadesFeriado->isNotEmpty()) {
                    // Si hay modalidades de feriado, generamos líneas para todas ellas
                    foreach ($modalidadesFeriado as $modalidadFeriado) {
                        $lineas = array_merge($lineas, LineaServicio::generarLineasParaServicio($servicio, $modalidadFeriado, $fechaInicio));
                    }
                } else {
                    // Si no hay modalidades de feriado, procesamos las modalidades regulares para ese día
                    foreach ($servicio->modalidades as $modalidad) {
                        if ($modalidad->dia_semana === $diaSemana) {
                            // Generar líneas para la modalidad normal (de lunes a viernes)
                            $lineas = array_merge($lineas, LineaServicio::generarLineasParaServicio($servicio, $modalidad, $fechaInicio));
                        }
                    }
                }
            } else {
                // Si no es feriado, procesar las modalidades regulares
                foreach ($servicio->modalidades as $modalidad) {
                    if ($modalidad->dia_semana === $diaSemana) {
                        $lineas = array_merge($lineas, LineaServicio::generarLineasParaServicio($servicio, $modalidad, $fechaInicio));
                    }
                }
            }


            $fechaInicio->addDay();
        }

        if (empty($lineas)) {
            return response()->json([
                'message' => 'No se generaron líneas nuevas.',
                'lineas' => [],
                'total' => 0,
            ]);
        }

        // Batch key para identificar la inserción masiva
        $batchKey = (string) Str::uuid();
        foreach ($lineas as &$linea) {
            $linea['batch_key'] = $batchKey;
        }

        LineaServicio::insert($lineas);

        $nuevasLineas = LineaServicio::where('batch_key', $batchKey)->get();

        return response()->json([
            'message' => 'Líneas generadas exitosamente.',
            'lineas' => LineaServicioResource::collection($nuevasLineas),
            'total' => $nuevasLineas->count(),
        ]);
    }

    public function generarLineasPlanDiario(Request $request, $id)
{
    $data = $request->validate([
        'fecha_inicio_servicio' => 'required|date',
        'fecha_fin_servicio'    => 'required|date',
    ]);

    $servicio = Servicio::findOrFail($id);
    $fechaInicio = Carbon::parse($data['fecha_inicio_servicio']);
    $fechaFin    = Carbon::parse($data['fecha_fin_servicio']);

    // Si no se confirma, realizamos una simulación sin crear las líneas reales.
    if (!$request->has('confirm')) {
        $resultado = LineaServicio::copiarLineasParaPlanDiario($servicio, $fechaInicio, $fechaFin, false);
        $omittedCount = $resultado['omittedCount'];
        // En la simulación, no se crean líneas, por lo que total generado es 0
        if ($omittedCount > 0) {
            return response()->json([
                'needsConfirmation' => true,
                'omittedCount'      => $omittedCount,
                'message'           => "Dentro del rango seleccionado se encontraron {$omittedCount} línea(s) sin asociado. ¿Desea continuar?",
                'lineas'            => [],
                'total'             => 0,
            ]);
        }
        // Si no se omiten, continuar con la creación real
    }

    // Se confirma o no hay líneas omitidas: creamos las líneas reales
    $resultado = LineaServicio::copiarLineasParaPlanDiario($servicio, $fechaInicio, $fechaFin, true);
    $lineasCopiadas = $resultado['lineasCopiadas'];
    $omittedCount   = $resultado['omittedCount'];
    $countGenerated = count($lineasCopiadas);

    if ($countGenerated === 0) {
        return response()->json([
            'message' => 'No se generaron líneas nuevas para el plan diario.',
            'lineas'  => [],
            'total'   => 0,
            'omitted' => $omittedCount,
        ]);
    }

    $mensaje = "Se generaron {$countGenerated} línea(s) para el plan diario.";
    if ($omittedCount > 0) {
        $mensaje .= " Se omitieron {$omittedCount} línea(s) sin asociado.";
    }

    return response()->json([
        'message' => $mensaje,
        'lineas'  => LineaServicioResource::collection($lineasCopiadas),
        'total'   => $countGenerated,
        'omitted' => $omittedCount,
    ]);
}




    public function obtenerTotales(ObtenerTotalRequest $request, $id)
    {
        $data = $request->validated();

        $servicio = Servicio::findOrFail($id);

        $horasPlanificadas = $servicio->calcularHorasPlanificadas($data['fecha_inicio'], $data['fecha_fin'], $id);
        $horasReales = $servicio->calcularHorasReales($data['fecha_inicio'], $data['fecha_fin'], $id);

        return response()->json([
            'horas_planificadas' => $horasPlanificadas,
            'horas_reales' => $horasReales,
        ]);
    }

    public function obtenerTotalesPorAsociado(ObtenerTotalesPorAsociadoRequest $request, $asociadoId)
    {
        $data = $request->validated();

        // Buscar todos los servicios con líneas asociadas al vigilador
        $servicios = Servicio::whereHas('lineas', function ($query) use ($asociadoId, $data) {
            $query->where('asociado_id', $asociadoId)
                ->whereBetween('fecha', [$data['fecha_inicio'], $data['fecha_fin']]);
        })->get();

        // Acumular totales para todos los servicios
        $totales = [
            'horas_validadas' => 0,
            'horas_justificadas' => 0,
            'horas_totales' => 0,
        ];

        foreach ($servicios as $servicio) {
            $resultado = $servicio->calcularHorasPorAsociado(
                $asociadoId,
                $data['fecha_inicio'],
                $data['fecha_fin']
            );

            $totales['horas_validadas'] += $resultado['horas_validadas'];
            $totales['horas_justificadas'] += $resultado['horas_justificadas'];
            $totales['horas_totales'] += $resultado['horas_totales'];
        }

        return response()->json($totales);
    }


    public function show(string $id)
    {
        $servicio = Servicio::with(['lineas.asociado', 'modalidades', 'lineas.motivos.tipoMotivo'])
            ->findOrFail($id);

        return response([
            'servicio' => new ServicioResource($servicio)
        ], 200);
    }


    public function update(ServicioRequest $request, Servicio $servicio)
    {
        $data = $request->validated();
        DB::beginTransaction();

        try {
            $servicio->update([
                'nombre' => $data['nombre'],
                'descripcion' => $data['descripcion'],
                'objetivo_id' => $data['objetivo_id'],
            ]);

            $modalidadIds = collect($data['modalidades'])->pluck('id')->filter()->all();

            $servicio->modalidades()->whereNotIn('id', $modalidadIds)->delete();

            foreach ($data['modalidades'] as $modalidadData) {
                if (isset($modalidadData['id'])) {
                    $servicio->modalidades()->where('id', $modalidadData['id'])->update($modalidadData);
                } else {
                    $servicio->modalidades()->create($modalidadData);
                }
            }

            DB::commit();
            $servicio = $servicio->fresh('modalidades', 'lineas');  // Aseguramos de que las líneas también se incluyan

            return response()->json([
                'message' => 'Servicio y modalidades actualizados exitosamente.',
                'servicio' => new ServicioResource($servicio),
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al actualizar el servicio: ' . $e->getMessage()], 500);
        }
    }


    public function destroy(Servicio $servicio)
    {
        //
    }
}
