<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prenda extends Model
{

    protected $fillable = ['stock', 'tipo_prenda_id', 'talle_id'];


    public function tipoPrenda()
    {
        return $this->belongsTo(TipoPrenda::class);
    }
    public function talle()
    {
        return $this->belongsTo(Talle::class);
    }

    use HasFactory;
}
