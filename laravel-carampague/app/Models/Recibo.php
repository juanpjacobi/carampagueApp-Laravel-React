<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    protected $fillable = [
        'asociado_id',
        'periodo',
        'total',
        'pdf_url',
    ];

    public function lineas()
    {
        return $this->hasMany(LineaRecibo::class);
    }

    public function asociado()
    {
        return $this->belongsTo(Asociado::class);
    }
}
