<?php

namespace App\Http\Controllers;

use App\Models\TipoTelefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\TipoTelefonoCollection;

class TipoTelefonoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    //    return response()->json(
    //     ['tipo-telefono' => TipoTelefono::all()]
    //    );
    return new TipoTelefonoCollection(TipoTelefono::all());
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
    public function show(TipoTelefono $tipoTelefono)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoTelefono $tipoTelefono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoTelefono $tipoTelefono)
    {
        //
    }
}
