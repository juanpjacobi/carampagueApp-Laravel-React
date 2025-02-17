<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoPrenda extends Model
{
    protected $table = 'tipos_prenda';
    protected $fillable = ['nombre_tipo_prenda'];

    use HasFactory;
}
