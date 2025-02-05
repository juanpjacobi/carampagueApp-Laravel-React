<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicioResource extends JsonResource
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
    'nombre' => $this->nombre,
    'descripcion' => $this->descripcion,
    'objetivo_id' => $this->objetivo_id,
    'modalidades_ids' => $this->modalidades->pluck('id'),
    'lineas_ids' => $this->lineas->pluck('id'),
];

    }
}
