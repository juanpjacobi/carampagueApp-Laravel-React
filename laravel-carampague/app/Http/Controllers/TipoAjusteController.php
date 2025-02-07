<?php

namespace App\Http\Controllers;

use App\Models\TipoAjuste;
use Illuminate\Http\Request;
use App\Http\Resources\TipoAjusteResource;

class TipoAjusteController extends Controller
{
    /**
     * Muestra la lista de todos los tipos de ajustes.
     */
    public function index()
    {
        $tiposAjuste = TipoAjuste::all();
        return response([
            'tipos_ajustes' => TipoAjusteResource::collection($tiposAjuste)
        ], 200);
    }

    /**
     * Almacena un nuevo tipo de ajuste.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'concepto' => 'required|string',
            'add'      => 'required|boolean'
        ]);

        $tipoAjuste = TipoAjuste::create($data);
        return response([
            'tipo_ajuste' => new TipoAjusteResource($tipoAjuste)
        ], 201);
    }

    /**
     * Muestra un tipo de ajuste específico.
     */
    public function show($id)
    {
        $tipoAjuste = TipoAjuste::findOrFail($id);
        return response([
            'tipo_ajuste' => new TipoAjusteResource($tipoAjuste)
        ], 200);
    }

    /**
     * Actualiza un tipo de ajuste existente.
     */
    public function update(Request $request, $id)
    {
        $tipoAjuste = TipoAjuste::findOrFail($id);
        $data = $request->validate([
            'concepto' => 'sometimes|string',
            'add'      => 'sometimes|boolean'
        ]);

        $tipoAjuste->update($data);
        return response([
            'tipo_ajuste' => new TipoAjusteResource($tipoAjuste)
        ], 200);
    }

    /**
     * Elimina un tipo de ajuste.
     */
    public function destroy($id)
    {
        $tipoAjuste = TipoAjuste::findOrFail($id);
        $tipoAjuste->delete();
        return response()->json([
            'message' => 'Tipo de ajuste eliminado correctamente.'
        ], 200);
    }
}
