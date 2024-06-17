<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AsociadoResource extends JsonResource
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
            'nombre' => $this->nombre_asociado,
            'apellido' => $this->apellido_asociado,
            'numero_asociado' => $this->numero_asociado,
            'cuit_asociado' => $this->cuit_asociado,
            'imagen' => $this->image_url,
            'fecha_alta' => $this->fecha_alta,
            'fecha_baja' => $this->fecha_baja,
            'fecha_nacimiento' => $this->fecha_nacimiento,
            'telefono' => $this->telefono,
            'direccion' => $this->direccion,
            'activo' => $this->activo,
            'estado_civil' => $this->estado_civil,
            'documentacion' => $this->documentacion,
            'entrega_ropa' => $this->entregaRopa

        ];
    }
}


