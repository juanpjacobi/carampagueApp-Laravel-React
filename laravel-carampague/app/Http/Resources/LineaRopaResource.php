<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineaRopaResource extends JsonResource
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
            'prenda_id' => $this->prenda_id,
            'cantidad' => $this->cantidad,
            'entrega_ropa_id' => $this->entrega_ropa_id
        ];
    }
}
