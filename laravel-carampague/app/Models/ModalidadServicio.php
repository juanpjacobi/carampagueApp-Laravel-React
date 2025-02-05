<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModalidadServicio extends Model
{
    protected $table = 'modalidades';

    protected $fillable = ['servicio_id', 'dia_semana', 'es_feriado', 'hora_inicio', 'hora_fin'];

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }

    public function esFeriado()
    {
        return $this->es_feriado;
    }
}
