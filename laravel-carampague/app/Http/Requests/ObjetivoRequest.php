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
            'nombre_objetivo' => ['required',Rule::unique('objetivos')->ignore($this->objetivo), 'string'],
            'estado_id' => ['required'],
            'cliente_id' => ['required'],
            'valor_vigilador' => ['required'],
            'valor_cliente' => ['required'],
            'calle'=>['required', 'string'],
            'numeracion'=>['required'],
            'barrio'=>['required'],
            'localidad_id'=>['required'],
        ];
    }
    public function messages()
    {
        return [
            'nombre_objetivo.required' => 'El nombre del objetivo es requerido',
            'nombre_objetivo.unique' => 'Ya existe un objetivo con ese nombre',
            'nombre_objetivo.string' => 'El nombre debe ser una cadena de caracteres',
            'valor_vigilador.required' => 'El valor vigilador es requerido',
            'valor_cliente.required' => 'El valor cliente es requerido',
            'estado_id.required' => 'El estado es requerido',
            'cliente_id.required' => 'El cliente es requerido',
            'calle.required'=> 'La calle es requerida',
            'calle.string'=> 'La calle debe ser una cadena de caracteres',
            'numeracion.required'=> 'La numeracion es requerida',
            'barrio.required'=> 'El barrio es requerido',
            'localidad_id.required'=> 'La localidad es requerida',
        ];
    }
}
