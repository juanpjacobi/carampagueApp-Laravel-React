<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    public $timestamps = true;
    protected $table = 'direcciones';
    protected $fillable = [
        'calle',
        'numeracion',
        'barrio',
        'piso',
        'departamento',
        'localidad_id'
    ];
    public function localidad(){
        return $this->belongsTo(Localidad::class);
    }

    use HasFactory;
}
