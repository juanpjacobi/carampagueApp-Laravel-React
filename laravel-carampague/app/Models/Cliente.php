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
        'condicion_iva_id',
        'activo',
        'telefono_id',
        'direccion_id',
        'barrio_id',
    ];
    public $timestamps = true;


    public function condicion_iva()
    {
        return $this->belongsTo(CondicionIva::class);
    }
    public function telefono()
    {
        return $this->belongsTo(Telefono::class)->with('tipoTelefono');
    }
    public function direccion()
    {
        return $this->belongsTo(Direccion::class)->with('barrio');
    }


    use HasFactory;
}
