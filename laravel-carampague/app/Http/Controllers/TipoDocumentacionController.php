<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipoDocumentacionCollection;
use App\Models\TipoDocumentacion;
use Illuminate\Http\Request;

class TipoDocumentacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos_documentacion = new TipoDocumentacionCollection(TipoDocumentacion::all());
        return response(['tipos_documentacion' => $tipos_documentacion], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoDocumentacion $tipoDocumentacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoDocumentacion $tipoDocumentacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoDocumentacion $tipoDocumentacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoDocumentacion $tipoDocumentacion)
    {
        //
    }
}
