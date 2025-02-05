<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Servicio extends Model
{
    protected $fillable = ['nombre', 'descripcion', 'objetivo_id'];

    public function modalidades()
    {
        return $this->hasMany(ModalidadServicio::class);
    }

    public function lineas()
    {
        return $this->hasMany(LineaServicio::class)->orderBy('fecha', 'asc');
    }

    public function objetivo()
    {
        return $this->belongsTo(Objetivo::class);
    }

    public static function crearConModalidades(array $data)
    {
        return DB::transaction(function () use ($data) {
            $servicio = self::create([
                'nombre' => $data['nombre'],
                'descripcion' => $data['descripcion'],
                'objetivo_id' => $data['objetivo_id'],
            ]);

            foreach ($data['modalidades'] as $modalidad) {
                $servicio->modalidades()->create($modalidad);
            }

            return $servicio;
        });
    }

    public function calcularHorasPlanificadas($fechaInicio, $fechaFin, $servicioId = null)
    {
        $query = LineaServicio::query()
            ->where('is_planificado', true)
            ->whereBetween('fecha', [$fechaInicio, $fechaFin]);

        if ($servicioId) {
            $query->where('servicio_id', $servicioId);
        }

        return $query->sum('horas_planificadas');
    }

    public function calcularHorasReales($fechaInicio, $fechaFin, $servicioId = null)
    {
        $query = LineaServicio::query()
            ->where(function ($query) {
                $query->where('is_validado', true)
                    ->orWhere('is_justificado', true);
            })
            ->whereBetween('fecha', [$fechaInicio, $fechaFin]);

        if ($servicioId) {
            $query->where('servicio_id', $servicioId);
        }

        return $query->sum('horas_reales');
    }

    public static function calcularHorasPorAsociado($asociadoId, $fechaInicio, $fechaFin)
    {
        // Horas validadas: Turnos que han sido validados
        $horasValidadas = LineaServicio::where('asociado_id', $asociadoId)
            ->where('is_validado', true)
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->sum('horas_reales');

        // Horas justificadas: Turnos invalidados con motivo pagable
        $horasJustificadas = LineaServicio::where('asociado_id', $asociadoId)
            ->where('is_justificado', true)
            ->whereHas('motivos.tipoMotivo', function ($query) {
                $query->where('is_pagable', true);
            })
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->sum('horas_planificadas'); // Asumimos que pagamos horas planificadas

        // Totales: Validadas + Justificadas
        return [
            'horas_validadas' => $horasValidadas,
            'horas_justificadas' => $horasJustificadas,
            'horas_totales' => $horasValidadas + $horasJustificadas,
        ];
    }

}
