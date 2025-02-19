<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'             => $this->id,
            'nombre_usuario' => $this->nombre_usuario,
            'rol_id'         => $this->rol_id,
            'activo'         => $this->activo,
        ];
    }
}
