<?php

namespace App\Http\Controllers;

use App\Http\Resources\LineaServicioResource;
use App\Http\Resources\MotivoCollection;
use App\Models\LineaServicio;
use App\Models\Motivo;
use App\Models\TipoMotivo;
use Illuminate\Http\Request;

class MotivoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $motivos = new MotivoCollection( Motivo::all());

        return response()->json([
            'motivos' => $motivos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'linea_servicio_id' => 'required|exists:lineas_servicio,id',
            'tipo_motivo_id' => 'required|exists:tipos_motivos,id',
            'observaciones' => 'nullable|string|max:255',
        ]);

        // Crear el motivo
        $motivo = Motivo::create($data);

        return response()->json([
            'message' => 'Motivo creado con éxito.',
            'motivo' => $motivo,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tipo_motivo_id' => 'required|exists:tipos_motivos,id',
            'observaciones'  => 'nullable|string|max:255',
        ]);

        $motivo = Motivo::findOrFail($id);
        $motivo->update($data);

        // Obtener el nuevo tipo de motivo para conocer si es pagable
        $tipoMotivo = \App\Models\TipoMotivo::find($data['tipo_motivo_id']);
        $updatedLinea = null;

        // Si el motivo está vinculado a una línea, actualizamos is_justificado
        if ($motivo->lineaServicio) {
            $motivo->lineaServicio->update([
                'is_justificado' => $tipoMotivo->is_pagable ? true : false,
            ]);
            $updatedLinea = $motivo->lineaServicio;
        }

        return response()->json([
            'message' => 'Motivo actualizado correctamente.',
            'motivo'  => $motivo,
            'linea'   => $updatedLinea ? new LineaServicioResource($updatedLinea) : null,
        ]);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
