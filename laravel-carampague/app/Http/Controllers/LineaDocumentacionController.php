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
        return response(['lineas' => $lineas], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LineaDocumentacionRequest $request)
    {

        $request->validated();

        try {

        $lineaDocumentacion = new LineaDocumentacion([
            "fecha_solicitud"=> $request->input('fecha_solicitud'),
            "observaciones"=> $request->input('observaciones'),
            "tipo_documentacion_id"=> $request->input('tipo_documentacion_id'),
            "estado_documentacion_id"=> $request->input('estado_documentacion_id'),
            "documentacion_id"=> $request->input('documentacion_id'),

        ]);
        $lineaDocumentacion->save();
        return response(['linea' => new LineaDocumentacionResource($lineaDocumentacion)], 201);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al crear linea documentacion', 'error' => $e->getMessage()], 500);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $linea = new LineaDocumentacionResource(LineaDocumentacion::find($id));
        return response(['linea' => new LineaDocumentacionResource($linea)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LineaDocumentacionRequest $request, string $id)
    {
        $request->validated();

        try {

        $linea = LineaDocumentacion::findOrFail($id);
        $linea->fecha_solicitud = $request->input('fecha_solicitud');
        $linea->fecha_entrega = $request->input('fecha_entrega');
        $linea->fecha_vencimiento = $request->input('fecha_vencimiento');
        $linea->observaciones = $request->input('observaciones');
        $linea->tipo_documentacion_id = $request->input('tipo_documentacion_id');
        $linea->estado_documentacion_id = $request->input('estado_documentacion_id');
        $linea->documentacion_id = $request->input('documentacion_id');
        $linea->save();
        return response()->json(['linea' => new LineaDocumentacionResource($linea)], 200);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al actualizar linea documentacion', 'error' => $e->getMessage()], 500);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LineaDocumentacion $lineaDocumentacion)
    {
        //
    }
}
