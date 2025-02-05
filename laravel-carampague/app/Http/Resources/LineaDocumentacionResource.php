<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineaDocumentacionResource extends JsonResource
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
            'fecha_solicitud' => $this->fecha_solicitud,
            'fecha_entrega' => $this->fecha_entrega,
            'fecha_vencimiento' => $this->fecha_vencimiento,
            'observaciones' => $this->observaciones,
            'estado_documentacion_id' => $this->estado_documentacion_id,
            'tipo_documentacion_id' => $this->tipo_documentacion_id,
            'documentacion_id' => $this->documentacion_id

        ];
    }
}
