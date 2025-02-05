<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class AsociadoRequest extends FormRequest
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
            'nombre_asociado' => ['required', 'string'],
            'apellido_asociado' => ['required', 'string'],
            'numero_asociado' => ['required', 'integer', Rule::unique('asociados')->ignore($this->asociado)],
            'fecha_alta' => ['required', 'date'],
            'fecha_nacimiento' => ['required', 'date'],
            'cuit_asociado' => ['required', 'digits:11', 'numeric'],
            'activo' => ['required', 'boolean'],
            'estado_civil_id' => ['required', 'integer'],
            'numero_telefono' => ['required', 'string', 'regex:/^\d{7,15}$/'],
            'tipo_telefono_id' => ['required', 'integer'],
            'calle' => ['required', 'string'],
            'numeracion' => ['required', 'numeric'],
            'barrio_id' => ['required', 'integer'],
            'piso' => ['nullable', 'numeric'],
            'departamento' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'nombre_asociado.required' => 'El nombre es requerido',
            'nombre_asociado.string' => 'El nombre debe ser una cadena de caracteres',
            'apellido_asociado.required' => 'El apellido es requerido',
            'apellido_asociado.string' => 'El apellido debe ser una cadena de caracteres',
            'numero_asociado.required' => 'El número de asociado es requerido',
            'numero_asociado.integer' => 'El número de asociado debe ser de tipo numérico',
            'numero_asociado.unique' => 'El número de asociado debe ser único',
            'cuit_asociado.required' => 'El CUIT del asociado es requerido',
            'cuit_asociado.digits' => 'El CUIT debe tener 11 dígitos',
            'cuit_asociado.numeric' => 'El CUIT debe ser de tipo numérico',
            'fecha_alta.required' => 'La fecha de alta es requerida',
            'fecha_alta.date' => 'La fecha de alta debe ser válida',
            'fecha_nacimiento.required' => 'La fecha de nacimiento es requerida',
            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser válida',
            'activo.required' => 'El estado es requerido',
            'activo.boolean' => 'El estado debe ser verdadero o falso',
            'estado_civil_id.required' => 'El estado civil es requerido',
            'estado_civil_id.integer' => 'El estado civil debe ser un número entero',
            'numero_telefono.required' => 'El número de teléfono es requerido',
            'numero_telefono.string' => 'El número de teléfono debe ser una cadena de caracteres',
            'numero_telefono.regex' => 'El número de teléfono debe tener entre 7 y 15 dígitos',
            'tipo_telefono_id.required' => 'El tipo de teléfono es requerido',
            'tipo_telefono_id.integer' => 'El tipo de teléfono debe ser un número entero',
            'calle.required' => 'La calle es requerida',
            'calle.string' => 'La calle debe ser una cadena de caracteres',
            'numeracion.required' => 'La numeración es requerida',
            'numeracion.numeric' => 'La numeración debe ser un número',
            'barrio_id.required' => 'El barrio es requerido',
            'barrio_id.integer' => 'El barrio debe ser un número entero',
            'piso.string' => 'El piso debe ser una cadena de caracteres',
            'departamento.string' => 'El departamento debe ser una cadena de caracteres',
        ];
    }
}
