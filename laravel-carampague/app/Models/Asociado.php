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
        'activo',
        'estado_civil_id',
        'direccion_id'
    ];


    public function estado_civil()
    {
        return $this->belongsTo(EstadoCivil::class);
    }
    public function documentacion()
    {
        return $this->belongsTo(Documentacion::class)->with('lineasDocumentacion');
    }
    public function telefono()
    {
        return $this->belongsTo(Telefono::class)->with('tipoTelefono');
    }
    public function direccion()
    {
        return $this->belongsTo(Direccion::class)->with('barrio');
    }
    public function entregaRopa()
    {
        return $this->hasMany(EntregaRopa::class)->with('lineas');
    }
    use HasFactory;
}
