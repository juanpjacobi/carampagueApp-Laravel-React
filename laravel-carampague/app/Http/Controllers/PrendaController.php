<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrendaCollection;
use App\Http\Resources\PrendaResource;
use App\Models\Prenda;
use Illuminate\Http\Request;

class PrendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prendas = new PrendaCollection(Prenda::all());
        return response(['prendas' => $prendas], 200);
    }

    public function store(Request $request)
    {
        // Validación: stock, tipo_prenda_id y talle_id son requeridos
        $data = $request->validate([
            'stock'           => 'required|numeric|min:0',
            'tipo_prenda_id'  => 'required|exists:tipos_prenda,id',
            'talle_id'        => 'required|exists:talles,id',
        ]);

        $prenda = Prenda::create($data);

        return response()->json(['prenda' => new PrendaResource($prenda)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Prenda $prenda)
    {
        return response()->json(['prenda' => new PrendaResource($prenda)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prenda $prenda)
    {
        // Permite actualizar el stock y/o otros campos
        $data = $request->validate([
            'stock'           => 'required|numeric|min:0',
            'tipo_prenda_id'  => 'sometimes|required|exists:tipos_prenda,id',
            'talle_id'        => 'sometimes|required|exists:talles,id',
        ]);

        $prenda->update($data);

        return response()->json(['prenda' => new PrendaResource($prenda)], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prenda $prenda)
    {
        $prenda->delete();
        return response()->json(['message' => 'Prenda eliminada correctamente.'], 200);
    }
}
