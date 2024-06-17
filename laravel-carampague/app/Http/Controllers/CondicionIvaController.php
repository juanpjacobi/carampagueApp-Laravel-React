<?php

namespace App\Http\Controllers;

use App\Http\Resources\CondicionIvaCollection;
use App\Models\CondicionIva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CondicionIvaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $condiciones_iva = new CondicionIvaCollection(CondicionIva::all());
        return response(['condiciones_iva' => $condiciones_iva], 200);

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
    public function show(CondicionIva $condicionIva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CondicionIva $condicionIva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CondicionIva $condicionIva)
    {
        //
    }
}
