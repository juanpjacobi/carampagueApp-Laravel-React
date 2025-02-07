<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Ajuste extends Model
{
    protected $fillable = [
        'asociado_id',
        'global',
        'tipo_ajuste_id',
        'monto',
        'periodo_inicio',
        'duracion_meses'
    ];

    public function asociado()
    {
        return $this->belongsTo(Asociado::class);
    }

    public function tipoAjuste()
    {
        return $this->belongsTo(TipoAjuste::class, 'tipo_ajuste_id');
    }


    public function getPeriodoFinAttribute()
    {
        if ($this->duracion_meses && $this->duracion_meses > 1 && $this->periodo_inicio) {
            return Carbon::createFromFormat('Y-m', $this->periodo_inicio)
                ->addMonthsNoOverflow($this->duracion_meses - 1)
                ->format('Y-m');
        }
        return $this->periodo_inicio;
    }
}
