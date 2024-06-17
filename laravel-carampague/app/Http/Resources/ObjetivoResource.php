<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObjetivoResource extends JsonResource
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
            'nombre' => $this->nombre_objetivo,
            'activo' => $this->activo,
            'direccion' => $this->direccion,
            'valor' => $this->valor,
            'cliente' => $this->cliente,
            'direccion' => $this->direccion,
            'barrio' => $this->direccion->barrio,
            'localidad' => $this->direccion->barrio->localidad,
        ];
    }
}
