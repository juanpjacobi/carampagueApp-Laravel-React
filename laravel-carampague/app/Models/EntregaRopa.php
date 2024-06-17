<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntregaRopa extends Model
{
    protected $fillable = ['descripcion', 'fecha', 'asociado_id'];
    protected $table = "entregas_ropa";
    public function lineas()
    {
        return $this->hasMany(LineaEntregaRopa::class)->with('prenda');
    }
    public function asociado()
    {
        return $this->belongsTo(Asociado::class);
    }
    use HasFactory;
}
