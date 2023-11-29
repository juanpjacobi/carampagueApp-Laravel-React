<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Localidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LocalidadRequest;
use App\Http\Resources\LocalidadCollection;

class LocalidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new LocalidadCollection(Localidad::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LocalidadRequest $request)
    {
        $data = $request->validated();
        $localidad = Localidad::create([
            'nombre_localidad' => $data['nombre_localidad'],
            'provincia_id' => $data['provincia_id'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        return ['localidad' => $localidad];
    }

    /**
     * Display the specified resource.
     */
    public function show(Localidad $localidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Localidad $localidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Localidad $localidad)
    {
        //
    }
}
