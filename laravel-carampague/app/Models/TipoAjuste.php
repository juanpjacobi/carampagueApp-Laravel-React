<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoAjuste extends Model

{
    protected $table = 'tipos_ajustes';

    protected $fillable = ['concepto', 'add', 'monto'];
}
