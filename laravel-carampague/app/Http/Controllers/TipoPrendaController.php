<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipoPrendaCollection;
use App\Models\TipoPrenda;
use Illuminate\Http\Request;

class TipoPrendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos_prenda = new TipoPrendaCollection(TipoPrenda::all()) ;
        return response(['tipos_prenda' => $tipos_prenda], 200);
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
    public function show(TipoPrenda $tipoPrenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoPrenda $tipoPrenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoPrenda $tipoPrenda)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoPrenda $tipoPrenda)
    {
        //
    }
}
