<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TipoAjusteResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'concepto'  => $this->concepto,
            'add'       => $this->add,
            'monto'       => $this->monto,

         ];
    }
}
