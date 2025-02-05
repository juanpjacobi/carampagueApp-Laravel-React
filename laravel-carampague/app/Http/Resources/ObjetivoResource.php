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
            'cliente_id' => $this->cliente_id,
            'direccion' => [
                'id' => $this->direccion->id,
                'calle' => $this->direccion->calle,
                'numeracion' => $this->direccion->numeracion,
                'piso' => $this->direccion->piso,
                'departamento' => $this->direccion->departamento,
                'barrio_id' => $this->direccion->barrio_id,
                'localidad_id' => $this->direccion->barrio->localidad_id,
                'provincia_id' => $this->direccion->barrio->localidad->provincia_id,
            ],
        ];
    }
}
