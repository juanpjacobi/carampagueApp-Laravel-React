<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documentacion extends Model
{
    protected $table = 'documentaciones';
    protected $fillable = [
        'descripcion',
    ];

    public function lineasDocumentacion()
    {
        return $this->hasMany(LineaDocumentacion::class)->with(
            ['tipoDocumentacion', 'estadoDocumentacion']
        );
    }
    use HasFactory;
}
