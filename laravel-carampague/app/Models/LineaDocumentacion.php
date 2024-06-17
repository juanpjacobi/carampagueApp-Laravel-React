<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineaDocumentacion extends Model
{
    protected $table = 'lineas_documentacion';
    protected $fillable = [
        'fecha_solicitud',
        'fecha_entrega',
        'fecha_vencimiento',
        'observaciones',
        'tipo_documentacion_id',
        'estado_documentacion_id',
        'documentacion_id'
    ];
    public function estadoDocumentacion()
    {
        return $this->belongsTo(EstadoDocumentacion::class);
    }
    public function tipoDocumentacion()
    {
        return $this->belongsTo(TipoDocumentacion::class);
    }
    public function documentacion()
    {
        return $this->belongsTo(Documentacion::class);
    }
    use HasFactory;
}
