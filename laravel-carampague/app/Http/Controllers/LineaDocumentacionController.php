<?php

namespace App\Http\Controllers;

use App\Http\Requests\LineaDocumentacionRequest;
use App\Http\Resources\LineaDocumentacionCollection;
use App\Http\Resources\LineaDocumentacionResource;
use App\Models\LineaDocumentacion;

class LineaDocumentacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lineas =  new LineaDocumentacionCollection(LineaDocumentacion::all());
        return response(['lineas' => $lineas]);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LineaDocumentacionRequest $request)
    {
        $request->validated();
        $lineaDocumentacion = new LineaDocumentacion([
            "fecha_solicitud"=> $request->input('fecha_solicitud'),
            "observaciones"=> $request->input('observaciones'),
            "tipo_documentacion_id"=> $request->input('tipo_documentacion_id'),
            "estado_documentacion_id"=> $request->input('estado_documentacion_id'),
            "documentacion_id"=> $request->input('documentacion_id'),

        ]);
        $lineaDocumentacion->save();
        return ['linea' => new LineaDocumentacionResource($lineaDocumentacion)];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $linea = new LineaDocumentacionResource(LineaDocumentacion::find($id));
        return ['linea' => $linea];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LineaDocumentacionRequest $request, string $id)
    {
        $request->validated();

        $linea = LineaDocumentacion::findOrFail($id);
        $linea->fecha_solicitud = $request->input('fecha_solicitud');
        $linea->fecha_entrega = $request->input('fecha_entrega');
        $linea->fecha_vencimiento = $request->input('fecha_vencimiento');
        $linea->observaciones = $request->input('observaciones');
        $linea->tipo_documentacion_id = $request->input('tipo_documentacion_id');
        $linea->estado_documentacion_id = $request->input('estado_documentacion_id');
        $linea->documentacion_id = $request->input('documentacion_id');
        $linea->save();
        return response()->json(['linea' => new LineaDocumentacionResource($linea)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LineaDocumentacion $lineaDocumentacion)
    {
        //
    }
}
