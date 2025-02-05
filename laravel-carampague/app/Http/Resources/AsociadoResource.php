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
                'barrio_id' => $this->direccion->barrio_id,
                'localidad_id' => $this->direccion->barrio->localidad_id,
                'provincia_id' => $this->direccion->barrio->localidad->provincia_id,
            ],
            'activo' => $this->activo,
            'estado_civil_id' => $this->estado_civil_id,
            'entrega_ropa_ids' => $this->entregaRopa->pluck('id'), // Devolver array de IDs
            'documentacion_id' => $this->documentacion->id,
        ];
    }
}


