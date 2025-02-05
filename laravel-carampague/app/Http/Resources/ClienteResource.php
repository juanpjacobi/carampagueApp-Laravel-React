<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
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
            'razon_social' => $this->razon_social,
            'cuit_cliente' => $this->cuit_cliente,
            'email' => $this->email,
            'activo' => $this->activo,
            'condicion_iva_id' => $this->condicion_iva->id, // Traemos solo el ID de la condición IVA
            'telefono' => [
                'numero_telefono' => $this->telefono->numero_telefono,
                'tipo_telefono_id' => $this->telefono->tipo_telefono_id,
            ],
            'direccion' => [
                'id' => $this->direccion->id,
                'calle' => $this->direccion->calle,
                'numeracion' => $this->direccion->numeracion,
                'piso' => $this->direccion->piso,
                'departamento' => $this->direccion->departamento,
                'barrio_id' => $this->direccion->barrio_id, // Solo traemos el ID del barrio
                'localidad_id' => $this->direccion->barrio->localidad_id, // Solo el ID de la localidad
                'provincia_id' => $this->direccion->barrio->localidad->provincia_id, // Solo el ID de la provincia
            ],
        ];
    }
}

