<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClienteRequest extends FormRequest
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
            'razon_social' => ['required', 'string', Rule::unique('clientes')->ignore($this->cliente)],
            'cuit_cliente' => ['required', 'digits:11', 'numeric'],
            'email' => ['required', 'email'],
            'activo' => ['required', 'boolean'],
            'condicion_iva_id' => ['required', 'integer'],
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
            'razon_social.required' => 'La razón social es requerida',
            'razon_social.unique' => 'Ya existe un cliente con ese nombre',
            'razon_social.string' => 'El nombre debe ser una cadena de caracteres',
            'cuit_cliente.required' => 'El CUIT del cliente es requerido',
            'cuit_cliente.digits' => 'El CUIT debe tener 11 dígitos',
            'cuit_cliente.numeric' => 'El CUIT debe ser de tipo numérico',
            'email.required' => 'El email es requerido',
            'email.email' => 'El email no es válido',
            'activo.required' => 'El estado es requerido',
            'activo.boolean' => 'El estado debe ser verdadero o falso',
            'condicion_iva_id.required' => 'La condición del IVA es requerida',
            'condicion_iva_id.integer' => 'La condición del IVA debe ser un número entero',
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

            // Nuevas validaciones
            'valor_vigilador.required' => 'El valor para el vigilador es requerido',
            'valor_vigilador.numeric' => 'El valor para el vigilador debe ser un número',
            'valor_vigilador.min' => 'El valor para el vigilador debe ser mayor o igual a 0',
            'valor_cliente.required' => 'El valor para el cliente es requerido',
            'valor_cliente.numeric' => 'El valor para el cliente debe ser un número',
            'valor_cliente.min' => 'El valor para el cliente debe ser mayor o igual a 0',
            'periodo.required' => 'El periodo es requerido',
            'periodo.date_format' => 'El formato del periodo debe ser YYYY-MM',
        ];
    }
}
