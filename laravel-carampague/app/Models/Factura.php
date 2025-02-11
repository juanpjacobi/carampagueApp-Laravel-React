<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    protected $fillable = [
        'cliente_id',
        'objetivo_id',
        'periodo',
        'total',
        'pdf_url',
    ];

    /**
     * Relación: Una factura tiene muchas líneas.
     */
    public function lineas()
    {
        return $this->hasMany(LineaFactura::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    public function objetivo()
    {
        return $this->belongsTo(Objetivo::class);
    }
}
