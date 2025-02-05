<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    public $timestamps = true;
    protected $table = 'direcciones';
    protected $fillable = [
        'calle',
        'numeracion',
        'piso',
        'departamento',
        'barrio_id',
    ];
    public function barrio(){
        return $this->belongsTo(Barrio::class);
    }
    use HasFactory;
}
