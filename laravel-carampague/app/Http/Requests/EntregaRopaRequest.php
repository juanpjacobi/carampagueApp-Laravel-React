<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EntregaRopaRequest extends FormRequest
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
    public function rules()
    {
        return [
            'descripcion' => ['required', 'string', 'max:255'],
            'asociado_id' => ['required', 'exists:asociados,id'],
            'lineas' => ['required', 'array', 'min:1'],
            'lineas.*.prenda_id' => ['required', 'exists:prendas,id'],
            'lineas.*.cantidad' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages()
    {
        return [
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.string' => 'La descripción debe ser una cadena de texto.',
            'asociado_id.required' => 'El ID del asociado es obligatorio.',
            'asociado_id.exists' => 'El ID del asociado no existe.',
            'lineas.required' => 'Las líneas de entrega son obligatorias.',
            'lineas.array' => 'Las líneas de entrega deben ser un arreglo.',
            'lineas.min' => 'Debe haber al menos una línea de entrega.',
            'lineas.*.prenda_id.required' => 'El ID de la prenda es obligatorio.',
            'lineas.*.prenda_id.exists' => 'El ID de la prenda no existe.',
            'lineas.*.cantidad.required' => 'La cantidad es obligatoria.',
            'lineas.*.cantidad.integer' => 'La cantidad debe ser un número entero.',
            'lineas.*.cantidad.min' => 'La cantidad debe ser al menos 1.',
        ];
    }
}
