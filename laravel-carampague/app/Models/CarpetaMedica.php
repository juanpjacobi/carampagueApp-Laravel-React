<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarpetaMedica extends Model
{    protected $table = 'carpetas_medicas';
    protected $casts = ['monto' => 'float'];


    protected $fillable = [
        'asociado_id',
        'periodo',
        'monto',
    ];

    /**
     * Relación: Una carpeta médica pertenece a un asociado.
     */
    public function asociado()
    {
        return $this->belongsTo(Asociado::class);
    }
}
