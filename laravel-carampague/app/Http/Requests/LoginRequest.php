<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'nombre_usuario' => ['required', 'exists:users,nombre_usuario'],
            'password' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'nombre_usuario.required' => 'El nombre es requerido',
            'nombre_usuario.exists' => 'No existe ese usuario',
            'password' => 'La contraseña es obligatoria'
        ];
    }
}
