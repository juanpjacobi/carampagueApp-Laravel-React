<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ProvinciaCollection;

class ProvinciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ProvinciaCollection(Provincia::all());

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
    public function show(Provincia $provincia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Provincia $provincia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Provincia $provincia)
    {
        //
    }
}
