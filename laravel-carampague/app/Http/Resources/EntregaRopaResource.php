<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntregaRopaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'descripcion' => $this->descripcion,
            'fecha' => $this->fecha,
            'lineas_ids' => $this->lineas->pluck('id'), // Solo los IDs de las líneas
            'asociado_id' => $this->asociado_id, // Solo el ID del asociado
        ];
    }
}
