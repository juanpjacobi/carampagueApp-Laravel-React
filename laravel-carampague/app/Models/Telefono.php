<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    public $timestamps = true;
    protected $fillable = [
        'tipo_telefono_id',
        'numero_telefono'
    ];


    public function tipoTelefono(){
        return $this->belongsTo(TipoTelefono::class);
    }
    use HasFactory;
}
