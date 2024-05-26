<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asociado extends Model
{
    protected $fillable = [
        'nombre_asociado',
        'apellido_asociado',
        'image_url',
        'fecha_alta',
        'fecha_baja',
        'numero_asociado',
        'cuit_asociado',
        'fecha_nacimiento',
        'estado_id',
        'estado_civil_id',

    ];
    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }
    public function estado_civil()
    {
        return $this->belongsTo(EstadoCivil::class);
    }
    public function documentacion()
    {
        return $this->belongsTo(Documentacion::class);
    }
    public function telefono()
    {
        return $this->belongsTo(Telefono::class);
    }
    public function direccion()
    {
        return $this->belongsTo(Direccion::class);
    }
    use HasFactory;
}
