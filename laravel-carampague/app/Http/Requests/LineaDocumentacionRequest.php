<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LineaDocumentacionRequest extends FormRequest
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
            'fecha_solicitud' => ['required', 'date'],
            'observaciones' => ['required', 'string'],
            'tipo_documentacion_id' => ['required'],
            'estado_documentacion_id' => ['required'],
            'documentacion_id' => ['required'],

        ];
    }
    public function messages()
    {
        return [
            'fecha_solicitud.required' => 'la fecha de solicitud es requerida',
            'observaciones.required' => 'las observaciones son requeridas',
            'observaciones.string' => 'las observaciones deben ser de tipo texto',
            'tipo_documentacion_id' => 'el tipo de documentacion es requerido',
            'estado_documentacion_id' => 'el estado de la documentacion es requerido',
            'documentacion_id' => 'la documentacion es requerida',
        ];
    }
}
