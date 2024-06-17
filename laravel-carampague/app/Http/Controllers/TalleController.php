<?php

namespace App\Http\Controllers;

use App\Http\Resources\TalleCollection;
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
    public function show(Talle $talle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Talle $talle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Talle $talle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Talle $talle)
    {
        //
    }
}
