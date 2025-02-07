<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AjusteResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'             => $this->id,
            'asociado_id'    => $this->asociado_id,
            'global'         => $this->global,
            'tipo_ajuste_id'    => $this->tipo_ajuste_id,
            'monto'          => $this->monto,
            'periodo_inicio' => $this->periodo_inicio,
            'duracion_meses' => $this->duracion_meses,
            'periodo_fin'    => $this->periodo_fin,
            'created_at'     => $this->created_at,
            'updated_at'     => $this->updated_at,
        ];
    }
}
