<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerarLineasRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Puedes agregar lógica de autorización si es necesario
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fecha_inicio_servicio' => 'required|date|before_or_equal:fecha_fin_servicio',
            'fecha_fin_servicio'    => 'required|date|after_or_equal:fecha_inicio_servicio',
        ];
    }

    public function messages()
    {
        return [
            'fecha_inicio_servicio.required' => 'La fecha de inicio del servicio es obligatoria.',
            'fecha_inicio_servicio.date' => 'La fecha de inicio debe ser una fecha válida.',
            'fecha_inicio_servicio.before_or_equal' => 'La fecha de inicio no puede ser posterior a la fecha de fin.',
            'fecha_fin_servicio.required' => 'La fecha de fin del servicio es obligatoria.',
            'fecha_fin_servicio.date' => 'La fecha de fin debe ser una fecha válida.',
            'fecha_fin_servicio.after_or_equal' => 'La fecha de fin no puede ser anterior a la fecha de inicio.',
        ];
    }
}
