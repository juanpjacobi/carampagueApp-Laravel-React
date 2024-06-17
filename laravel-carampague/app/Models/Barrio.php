<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barrio extends Model
{
    protected $fillable = [
        'nombre_barrio',
        'localidad_id'
    ];
    public function localidad(){
        return $this->belongsTo(Localidad::class)->with('provincia');
    }
    use HasFactory;
}
