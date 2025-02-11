<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineaFactura extends Model
{
    protected $table = 'lineas_factura';

    protected $fillable = [
        'factura_id',
        'descripcion',
        'horas',
        'valor_hora',
        'subtotal',
    ];

    public function factura()
    {
        return $this->belongsTo(Factura::class);
    }
}
