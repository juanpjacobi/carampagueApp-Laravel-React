<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ToggleLineaServicioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'is_validado' => 'nullable|boolean',
            'crear_linea_real' => 'boolean',
            'revertir' => 'boolean',
            'tipo_motivo_id' => 'nullable|exists:tipos_motivos,id',
            'observaciones' => 'nullable|string|max:255',
        ];
    }
}
