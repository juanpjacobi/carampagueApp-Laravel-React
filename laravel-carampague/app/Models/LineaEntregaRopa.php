<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineaEntregaRopa extends Model
{
    protected $fillable = ['prenda_id', 'entrega_ropa_id', 'cantidad'];

    public function entregaRopa()
    {
        return $this->belongsTo(EntregaRopa::class);
    }

    public function prenda()
    {
        return $this->belongsTo(Prenda::class)->with(['TipoPrenda', 'Talle']);
    }
    use HasFactory;
}
