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
            'razon_social' => ['required',Rule::unique('clientes')->ignore($this->cliente), 'string'],
            'cuit_cliente' => ['required', 'integer'],
            'email' => ['required', 'email'],
            'estado_id' => ['required'],
            'condicion_iva_id'=>['required'],
            'numero_telefono'=>['required'],
            'tipo_telefono_id'=>['required'],
            'calle'=>['required', 'string'],
            'numeracion'=>['required'],
            'barrio'=>['required'],
            'localidad_id'=>['required'],

        ];
    }

    public function messages()
    {
        return [
            'razon_social.required' => 'La razon social es requerida',
            'razon_social.unique' => 'Ya existe un cliente con ese nombre',
            'razon_social.string' => 'El nombre debe ser una cadena de caracteres',
            'cuit_cliente.required' => 'El cuit del cliente es requerido',
            'cuit_cliente.integer' => 'El cuit debe ser de tipo numerico',
            'email.required' => 'El email es requerido',
            'email.email' => 'El email no es valido',
            'estado_id.required' => 'El estado es requerido',
            'condicion_iva_id.required' => 'La condicion del iva es requerido',
            'numero_telefono.required' => 'El numero de telefono es requerido',
            'tipo_telefono_id'=> 'El tipo de telefono es requerido',
            'calle.required'=> 'La calle es requerida',
            'calle.string'=> 'La calle debe ser una cadena de caracteres',
            'numeracion.required'=> 'La numeracion es requerida',
            'barrio.required'=> 'El barrio es requerido',
            'localidad_id.required'=> 'La localidad es requerida',
        ];
    }
}
