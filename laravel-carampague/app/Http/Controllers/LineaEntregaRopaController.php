<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineaRopaCollection;
use App\Models\LineaEntregaRopa;
use Illuminate\Http\Request;

class LineaEntregaRopaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lineas_entregas_ropa = new LineaRopaCollection(LineaEntregaRopa::all());
        return response(['lineas_entrega_ropa' => $lineas_entregas_ropa], 200);
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
    public function show(LineaEntregaRopa $lineaEntregaRopa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LineaEntregaRopa $lineaEntregaRopa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LineaEntregaRopa $lineaEntregaRopa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LineaEntregaRopa $lineaEntregaRopa)
    {
        //
    }
}
