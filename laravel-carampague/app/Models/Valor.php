<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valor extends Model
{
    protected $table = 'valores';
    protected $fillable = [
        'valor_vigilador',
        'valor_cliente',
        'cliente_id',
        'periodo'
    ];

    public function cliente()
{
    return $this->belongsTo(Cliente::class);
}

    use HasFactory;
}
