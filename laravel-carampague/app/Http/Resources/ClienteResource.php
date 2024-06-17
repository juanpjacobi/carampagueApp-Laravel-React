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
            'condicion_iva' => $this->condicion_iva,
            'telefono' => $this->telefono,
            'tipo_telefono' => $this->telefono->tipoTelefono,
            'direccion' => $this->direccion,
            'barrio' => $this->direccion->barrio,
            'localidad' => $this->direccion->barrio->localidad,
        ];
    }
}
