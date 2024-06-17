<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentacionResource;
use App\Models\Documentacion;
use App\Models\LineaDocumentacion;
use Illuminate\Http\Request;

class DocumentacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(string $id)
    {
        $documentacion = new DocumentacionResource(Documentacion::find($id));
        return response(['documentacion' => $documentacion], 200);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(documentacion $documentacion)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, documentacion $documentacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(documentacion $documentacion)
    {
        //
    }


}
