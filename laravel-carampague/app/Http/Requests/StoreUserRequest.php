<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; // O ajusta la autorización según tu lógica
    }

    public function rules()
    {
        return [
            'nombre_usuario' => 'required|string|max:255|unique:users,nombre_usuario',
            'password'       => 'required|string|min:6',
            'rol_id'         => 'required|exists:rols,id', // Asumiendo que la tabla roles existe
            'activo'         => 'required|boolean',
        ];
    }
}
