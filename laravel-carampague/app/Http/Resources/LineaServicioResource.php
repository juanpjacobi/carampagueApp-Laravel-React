<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineaServicioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id'                 => $this->id,
            'servicio_id'        => $this->servicio_id,
            'asociado_id'        => $this->asociado_id,
            'fecha'              => $this->fecha,
            'hora_inicio'        => substr($this->hora_inicio, 0, 5), // Ejemplo
            'hora_fin'           => substr($this->hora_fin, 0, 5),
            'hora_real_inicio'   => substr($this->hora_real_inicio, 0, 5),
            'hora_real_fin'      => substr($this->hora_real_fin, 0, 5),
            'horas_reales'    => $this->horas_reales
            ? number_format($this->horas_reales, 2, '.', '')
            : null,
        'horas_planificadas'    => $this->horas_planificadas
            ? number_format($this->horas_planificadas, 2, '.', '')
            : null,
            'is_planificado'     => $this->is_planificado,
            'is_validado'        => $this->is_validado,
            'is_justificado'     => $this->is_justificado,
            'linea_original_id'  => $this->linea_original_id,
            // Si lo deseas, puedes agregar otros campos básicos
        ];
    }
}
