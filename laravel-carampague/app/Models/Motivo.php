<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motivo extends Model
{
    use HasFactory;

    protected $casts = [
        'tipo_motivo_id' => 'integer',
    ];

    protected $fillable = ['linea_servicio_id', 'tipo_motivo_id', 'observaciones'];

    public function lineaServicio()
    {
        return $this->belongsTo(LineaServicio::class);
    }

    public function tipoMotivo()
    {
        return $this->belongsTo(TipoMotivo::class);
    }
}
