<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipoMotivoResource extends JsonResource
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
            'nombre_tipo_motivo' => $this->nombre_tipo_motivo,
            'is_pagable' => $this->is_pagable, // Si es pagable o no
        ];
    }
}
