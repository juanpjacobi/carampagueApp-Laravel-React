<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServicioRequest extends FormRequest
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
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'objetivo_id' => 'required|exists:objetivos,id',
            'modalidades' => 'required|array',
            'modalidades.*.dia_semana' => 'required|integer|min:0|max:8',
            'modalidades.*.hora_inicio' => 'required|date_format:H:i',
            'modalidades.*.hora_fin' => 'required|date_format:H:i',
        ];
    }
}
