<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajusta según tu lógica de autorización
    }

    public function rules()
    {
        return [
            'activo' => 'required|boolean',
        ];
    }
}
