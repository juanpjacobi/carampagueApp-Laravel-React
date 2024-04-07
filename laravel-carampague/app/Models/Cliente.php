<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'razon_social',
        'cuit_cliente',
        'email',
        'estado_id',
        'condicion_iva_id',
        'calle',
        'numeracion',
        'barrio',
        'piso',
        'departamento',
        'localidad_id',
        'tipo_telefono_id',
        'numero_telefono'
    ];
    public $timestamps = true;

    public function estado()
    {
        return $this->belongsTo(Estado::class);
    }
    public function condicion_iva()
    {
        return $this->belongsTo(CondicionIva::class);
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
