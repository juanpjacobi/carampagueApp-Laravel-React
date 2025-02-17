<?php

namespace App\Http\Controllers;

use App\Http\Resources\TalleCollection;
use App\Http\Resources\TalleResource;
use App\Models\Talle;
use Illuminate\Http\Request;

class TalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $talles =  new TalleCollection(Talle::all());
        return response(['talles' => $talles], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre_talle' => 'required|string|max:255',
            // Agrega otros campos si es necesario
        ]);

        $talle = Talle::create($data);

        return response()->json(['talle' => new TalleResource($talle)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Talle $talle)
    {
        return response()->json(['talle' => new TalleResource($talle)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Talle $talle)
    {
        $data = $request->validate([
            'nombre_talle' => 'required|string|max:255',
        ]);

        $talle->update($data);

        return response()->json(['talle' => new TalleResource($talle)], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Talle $talle)
    {
        $talle->delete();
        return response()->json(['message' => 'Talle eliminado correctamente.'], 200);
    }
}
