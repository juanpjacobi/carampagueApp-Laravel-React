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
            'numero_asociado' => ['required',Rule::unique('asociados')->ignore($this->asociado), 'integer'],
            'fecha_alta' => ['required', 'date'],
            'fecha_nacimiento' => ['required', 'date'],
            'cuit_asociado' => ['required', 'integer'],
            'estado_id' => ['required'],
            'estado_civil_id' => ['required'],
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
            'nombre_asociado.required' => 'El nombre es requerido',
            'nombre_asociado.string' => 'El nombre debe ser una cadena de caracteres',
            'apellido_asociado.required' => 'El apellido es requerido',
            'apellido_asociado.string' => 'El apellido debe ser una cadena de caracteres',
            'numero_asociado.required' => 'El numero de asociado es requerido',
            'numero_asociado.integer' => 'El numero de asociado debe ser de tipo numerico',
            'numero_asociado.unique' => 'El numero de asociado debe ser unico',
            'cuit_asociado.required' => 'El cuit del cliente es requerido',
            'cuit_asociado.integer' => 'El cuit debe ser de tipo numerico',
            'fecha_alta.required' => 'La fecha de alta es requerida',
            'fecha_alta.date' => 'La fecha de alta deb ser valida',
            'fecha_nacimiento.required' => 'La fecha de alta es requerida',
            'fecha_nacimiento.date' => 'La fecha de alta deb ser valida',
            'estado_id.required' => 'El estado es requerido',
            'estado_civil_id.required' => 'El estado es requerido',
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
