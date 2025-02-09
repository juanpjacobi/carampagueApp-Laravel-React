<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineaRecibo extends Model
{
    protected $table = 'lineas_recibo';
    protected $casts = [
        'es_ajuste' => 'boolean',
    ];
    protected $fillable = [
        'recibo_id',
        'descripcion',
        'horas',
        'valor_hora',
        'subtotal',
        'es_ajuste',
    ];

    /**
     * Relación: Una línea de recibo pertenece a un recibo.
     */
    public function recibo()
    {
        return $this->belongsTo(Recibo::class);
    }
}
