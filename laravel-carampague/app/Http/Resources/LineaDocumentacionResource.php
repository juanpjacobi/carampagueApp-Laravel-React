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
            'estado_documentacion' => $this->estadoDocumentacion,
            'tipo_documentacion' => $this->tipoDocumentacion,
            'documentacion' => $this->documentacion

        ];
    }
}
