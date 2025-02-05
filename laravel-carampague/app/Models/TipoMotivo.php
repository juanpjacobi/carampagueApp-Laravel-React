<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMotivo extends Model
{
    use HasFactory;

    protected $table = 'tipos_motivos';
    protected $fillable = ['nombre_tipo_motivo', 'is_pagable'];


    public function motivos()
    {
        return $this->hasMany(Motivo::class);
    }
}
