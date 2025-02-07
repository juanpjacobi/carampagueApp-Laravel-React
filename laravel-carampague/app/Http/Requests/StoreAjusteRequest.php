<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAjusteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'asociado_id'    => 'nullable|exists:asociados,id',
            'global'         => 'required|boolean',
            'tipo_ajuste_id' => 'required|exists:tipos_ajustes,id',
            'monto'          => 'nullable|numeric',
            'periodo_inicio' => 'nullable|date_format:Y-m',
            'duracion_meses' => 'nullable|integer|min:1'
        ];
    }
}
