<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    public $timestamps = true;

    public function estado(){
        return $this->belongsTo(Estado::class);
    }
    public function condicion_iva(){
        return $this->belongsTo(CondicionIva::class);
    }
    public function telefono(){
        return $this->belongsTo(Telefono::class);
    }
    public function direccion(){
        return $this->belongsTo(Direccion::class);
    }



    use HasFactory;
}
