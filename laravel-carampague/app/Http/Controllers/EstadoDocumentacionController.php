<?php

namespace App\Http\Controllers;

use App\Http\Resources\EstadoDocumentacionCollection;
use App\Models\EstadoDocumentacion;
use Illuminate\Http\Request;

class EstadoDocumentacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estados_documentacion = new EstadoDocumentacionCollection(EstadoDocumentacion::all());
        return response(['estados_documentacion' => $estados_documentacion]);
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
    public function show(EstadoDocumentacion $estadoDocumentacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EstadoDocumentacion $estadoDocumentacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EstadoDocumentacion $estadoDocumentacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EstadoDocumentacion $estadoDocumentacion)
    {
        //
    }
}
