<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    protected $table = 'localidades';
    protected $fillable = ['nombre_localidad','provincia_id'];
    public function provincia(){
        return $this->belongsTo(Provincia::class);
    }
    use HasFactory;
}
