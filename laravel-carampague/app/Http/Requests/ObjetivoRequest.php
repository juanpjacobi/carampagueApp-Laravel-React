<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class ObjetivoRequest extends FormRequest
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
            'nombre_objetivo' => ['required', 'string', Rule::unique('objetivos')->ignore($this->objetivo)],
            'activo' => ['required', 'boolean'],
            'cliente_id' => ['required', 'integer'],
            'calle'=>['required', 'string'],
            'numeracion'=>['required', 'numeric'],
            'barrio_id'=>['required', 'integer'],
            'piso'=>['nullable', 'numeric'],
            'departamento'=>['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'nombre_objetivo.required' => 'El nombre del objetivo es requerido',
            'nombre_objetivo.unique' => 'Ya existe un objetivo con ese nombre',
            'nombre_objetivo.string' => 'El nombre debe ser una cadena de caracteres',
            'valor_vigilador.required' => 'El valor vigilador es requerido',
            'valor_vigilador.numeric' => 'El valor vigilador debe ser un número',
            'valor_cliente.required' => 'El valor cliente es requerido',
            'valor_cliente.numeric' => 'El valor cliente debe ser un número',
            'activo.required' => 'El estado es requerido',
            'activo.boolean' => 'El estado debe ser verdadero o falso',
            'cliente_id.required' => 'El cliente es requerido',
            'cliente_id.integer' => 'El cliente debe ser un número entero',
            'calle.required'=> 'La calle es requerida',
            'calle.string'=> 'La calle debe ser una cadena de caracteres',
            'numeracion.required'=> 'La numeración es requerida',
            'numeracion.numeric'=> 'La numeración debe ser un número',
            'barrio_id.required'=> 'El barrio es requerido',
            'barrio_id.integer'=> 'El barrio debe ser un número entero',
            'piso.string' => 'El piso debe ser una cadena de caracteres',
            'departamento.string' => 'El departamento debe ser una cadena de caracteres',
        ];
    }
}
