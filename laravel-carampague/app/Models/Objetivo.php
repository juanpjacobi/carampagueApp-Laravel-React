<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objetivo extends Model
{
    protected $fillable = [
        'nombre_objetivo',
        'activo',
        'direccion_id',
        'cliente_id',
    ];


    public function direccion()
    {
        return $this->belongsTo(Direccion::class);
    }
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }




    use HasFactory;
}
