<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipoPrendaCollection;
use App\Http\Resources\TipoPrendaResource;
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

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_tipo_prenda' => 'required|string|max:255',
        ]);

        $tipoPrenda = TipoPrenda::create($data);

        return response()->json(['tipo_prenda' => new TipoPrendaResource($tipoPrenda)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoPrenda $tipos_prenda)
    {
        return response()->json(['tipo_prenda' => new TipoPrendaResource($tipos_prenda)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoPrenda $tipos_prenda)
    {
        $data = $request->validate([
            'nombre_tipo_prenda' => 'required|string|max:255',
        ]);

        $tipos_prenda->update($data);

        return response()->json(['tipo_prenda' => new TipoPrendaResource($tipos_prenda)], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoPrenda $tipos_prenda)
    {
        $tipos_prenda->delete();
        return response()->json(['message' => 'Tipo de prenda eliminado correctamente.'], 200);
    }
}
