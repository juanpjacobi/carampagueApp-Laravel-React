<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MotivoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tipo_motivo_id' => $this->tipo_motivo_id,
            'linea_servicio_id' => $this->linea_servicio_id,
            'observaciones' => $this->observaciones,
        ];
    }
}
