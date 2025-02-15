<?php

namespace App\Models;

use App\Http\Resources\LineaServicioResource;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LineaServicio extends Model
{
    protected $table = 'lineas_servicio';
    protected $casts = [
        'is_planificado' => 'boolean',
        'is_validado' => 'boolean',
        'is_justificado' => 'boolean', // Casteo a boolean
    ];

    protected $fillable = [
        'servicio_id',
        'asociado_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'hora_real_inicio',
        'hora_real_fin',
        'horas_planificadas',
        'horas_reales',
        'is_planificado',
        'is_validado',
        'is_justificado',
        'linea_original_id'
    ];


    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }

    public function asociado()
    {
        return $this->belongsTo(Asociado::class);
    }

    public function motivos()
    {
        return $this->hasMany(Motivo::class, 'linea_servicio_id');
    }

    public static function calcularHoras($horaInicio, $horaFin)
    {
        $inicio = Carbon::createFromTimeString($horaInicio);
        $fin = Carbon::createFromTimeString($horaFin);

        if ($fin->lt($inicio)) {
            $fin->addDay();
        }

        return $inicio->diffInHours($fin);
    }

    public static function crearLinea(array $data)
    {
        return self::create([
            'servicio_id' => $data['servicio_id'],
            'asociado_id' => $data['asociado_id'] ?? null,
            'fecha' => $data['fecha'],
            'hora_inicio' => $data['hora_inicio'],
            'hora_fin' => $data['hora_fin'],
            'hora_real_inicio' => $data['hora_inicio'],
            'hora_real_fin' => $data['hora_fin'],
            'horas_planificadas' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'horas_reales' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'is_planificado' => $data['is_planificado'],
            'is_validado' => $data['is_validado'],
        ]);
    }

    public static function generarLineasPlanificadas(array $data)
    {
        return [
            'servicio_id' => $data['servicio_id'],
            'fecha' => $data['fecha'],
            'hora_inicio' => $data['hora_inicio'],
            'hora_fin' => $data['hora_fin'],
            'horas_planificadas' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'hora_real_inicio' => $data['hora_inicio'],
            'hora_real_fin' => $data['hora_fin'],
            'horas_reales' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'is_planificado' => true,
            'is_validado' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public static function generarLineasPlanDiario(array $data)
    {
        return self::create([
            'servicio_id' => $data['servicio_id'],
            'asociado_id' => $data['asociado_id'] ?? null,
            'fecha' => $data['fecha'],
            'hora_inicio' => $data['hora_inicio'],
            'hora_fin' => $data['hora_fin'],
            'hora_real_inicio' => $data['hora_real_inicio'],
            'hora_real_fin' => $data['hora_real_fin'],
            'horas_planificadas' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'horas_reales' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'is_planificado' => $data['is_planificado'],
            'is_validado' => $data['is_validado'],
            'linea_original_id' => $data['linea_original_id'],  // Asegúrate de que esté aquí
        ]);
    }


    public static function generarLineasParaServicio($servicio, $modalidad, $fecha)
    {
        $lineas = [];
        $horaInicio = $modalidad->hora_inicio;
        $horaFin = $modalidad->hora_fin;

        $existeLinea = self::where('servicio_id', $servicio->id)
            ->whereDate('fecha', $fecha->toDateString())
            ->exists();

        if (!$existeLinea) {
            $lineas[] = self::generarLineasPlanificadas([
                'servicio_id' => $servicio->id,
                'fecha' => $fecha->toDateString(),
                'hora_inicio' => $horaInicio,
                'hora_fin' => $horaFin,
            ]);
        }

        return $lineas;
    }

    public static function copiarLineasParaPlanDiario($servicio, $fechaInicio, $fechaFin, $create = true)
    {
        $lineasCopiadas = [];
        $omittedCount = 0;

        // Obtener todas las líneas planificadas en el rango de fechas
        $lineasPlanificadas = self::where('servicio_id', $servicio->id)
            ->whereDate('fecha', '>=', $fechaInicio->toDateString())
            ->whereDate('fecha', '<=', $fechaFin->toDateString())
            ->where('is_planificado', true)
            ->get();

        foreach ($lineasPlanificadas as $linea) {
            // Si la línea no tiene asociado, se omite
            if (is_null($linea->asociado_id)) {
                $omittedCount++;
                continue;
            }

            // Verificar duplicados: existe una línea similar en el plan diario
            $existeLinea = self::where('servicio_id', $linea->servicio_id)
                ->whereDate('fecha', $linea->fecha)
                ->where('hora_inicio', $linea->hora_inicio)
                ->where('hora_fin', $linea->hora_fin)
                ->where('is_planificado', false)
                ->exists();

            if (!$existeLinea) {
                $nuevaLineaData = [
                    'servicio_id'        => $linea->servicio_id,
                    'fecha'              => $linea->fecha,
                    'hora_inicio'        => $linea->hora_inicio,
                    'hora_fin'           => $linea->hora_fin,
                    'hora_real_inicio'   => $linea->hora_real_inicio,
                    'hora_real_fin'      => $linea->hora_real_fin,
                    'horas_planificadas' => $linea->horas_planificadas,
                    'horas_reales'       => $linea->horas_reales,
                    'is_planificado'     => false,
                    'is_validado'        => true,
                    'linea_original_id'  => $linea->id,
                    'asociado_id'        => $linea->asociado_id,
                ];

                if ($create) {
                    // Método real de creación (puede ser create() o un método propio)
                    $lineaCreada = self::create($nuevaLineaData);
                    $lineasCopiadas[] = $lineaCreada;
                }
            }
        }

        return [
            'lineasCopiadas' => $lineasCopiadas,
            'omittedCount'   => $omittedCount,
        ];
    }






    public function actualizarLinea(array $data)
    {
        $this->update([
            'fecha' => $data['fecha'],
            'hora_inicio' => $data['hora_inicio'],
            'hora_fin' => $data['hora_fin'],
            'hora_real_inicio' => $data['hora_inicio'],
            'hora_real_fin' => $data['hora_fin'],
            'horas_planificadas' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
            'horas_reales' => self::calcularHoras($data['hora_inicio'], $data['hora_fin']),
        ]);

        return $this;
    }

    public function asignarAsociado(?int $asociadoId)
    {
        $this->update(['asociado_id' => $asociadoId]);
        return $this;
    }

    public function actualizarHoras(?string $horaInicio, ?string $horaFin)
    {
        if ($horaInicio) {
            $this->hora_real_inicio = $horaInicio;
        }

        if ($horaFin) {
            $this->hora_real_fin = $horaFin;
        }

        // Ajustar hora_real_inicio si es menor a hora_inicio
        if ($this->hora_real_inicio && $this->hora_inicio) {
            $realInicio = Carbon::parse($this->hora_real_inicio);
            $planInicio = Carbon::parse($this->hora_inicio);
            if ($realInicio->lt($planInicio)) {
                $this->hora_real_inicio = $planInicio->format('H:i');
            }
        }

        // Calcular horas reales
        if ($this->hora_real_inicio && $this->hora_real_fin) {
            $inicio = Carbon::parse($this->hora_real_inicio);
            $fin = Carbon::parse($this->hora_real_fin);

            if ($fin->lt($inicio)) {
                $fin->addDay();
            }

            $minutos = $inicio->diffInMinutes($fin);
            $this->horas_reales = round($minutos / 60, 2);
        } else {
            $this->horas_reales = null;
        }

        $this->save();
        return $this;
    }

    public function revertir()
    {
        if ($this->is_validado !== false) {
            throw new \Exception('La línea no está invalidada.');
        }

        DB::transaction(function () {
            $this->motivos()->delete();
            $this->update([
                'is_validado' => true,
                'is_justificado' => null,
            ]);
        });

        return $this;
    }

    public function crearNuevaLinea()
    {
        return self::create([
            'servicio_id' => $this->servicio_id,
            'fecha' => $this->fecha,
            'is_planificado' => false,
            'is_validado' => null,
            'is_justificado' => null,
            'hora_inicio' => $this->hora_inicio,
            'hora_real_fin' => $this->hora_real_fin,
            'hora_real_inicio' => $this->hora_real_inicio,
            'hora_fin' => $this->hora_fin,
            'horas_reales' => $this->horas_reales,
            'horas_planificadas' => $this->horas_planificadas,
        ]);
    }


    public function agregarMotivo(array $data)
    {
        $motivo = Motivo::create([
            'linea_servicio_id' => $this->id,
            'tipo_motivo_id' => $data['tipo_motivo_id'],
            'observaciones' => $data['observaciones'] ?? null,
        ]);

        $isPagable = $motivo->tipoMotivo->is_pagable;
        $this->update(['is_justificado' => $isPagable]);

        return $motivo; // Retornamos el motivo creado
    }

}
