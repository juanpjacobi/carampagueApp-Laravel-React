<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAjusteRequest extends FormRequest
{
    public function authorize()
    {
        // Agrega aquí la lógica de autorización si es necesaria.
        return true;
    }

    public function rules()
    {
        return [
            'asociado_id'    => 'nullable|exists:asociados,id',
            'global'         => 'sometimes|boolean',
            'tipo_ajuste_id' => 'required|exists:tipos_ajustes,id',
            'monto'          => 'sometimes|numeric',
            'periodo_inicio' => 'sometimes|nullable|date_format:Y-m',
            'duracion_meses' => 'sometimes|nullable|integer|min:1'
        ];
    }
}
