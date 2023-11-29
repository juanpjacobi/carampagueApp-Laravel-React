<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocalidadRequest extends FormRequest
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
            'nombre_localidad' => ['required','unique:localidades', 'string'],
            'provincia_id' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'nombre_localidad.required' => 'El nombre de la localidad es requerido',
            'nombre_localidad.unique' => 'Ya existe una localidad con ese nombre',
            'provincia_id' => 'La provincia es requerida'
        ];
    }
}
