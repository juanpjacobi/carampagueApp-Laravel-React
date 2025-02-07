<?php

namespace App\Http\Controllers;

use App\Models\Ajuste;
use App\Http\Requests\StoreAjusteRequest;
use App\Http\Requests\UpdateAjusteRequest;
use App\Http\Resources\AjusteResource;
use App\Models\TipoAjuste;
use Illuminate\Http\Request;

class AjustesController extends Controller
{

    public function index(Request $request)
    {
        $ajustes =  AjusteResource::collection(Ajuste::All());
        return response(["ajustes" => $ajustes], 200);
    }

    /**
     * Crear un ajuste.
     */
    public function store(StoreAjusteRequest $request)
    {
        $data = $request->validated();

        // Si no se proporciona un monto personalizado, se usa el monto predeterminado del tipo de ajuste
        if (empty($data['monto'])) {
            $tipoAjuste = TipoAjuste::findOrFail($data['tipo_ajuste_id']);
            $data['monto'] = $tipoAjuste->monto;
        }

        $ajuste = Ajuste::create($data);
        return response(['ajuste' => new AjusteResource($ajuste)], 201);
    }

    /**
     * Mostrar un ajuste específico.
     */
    public function show($id)
    {
        $ajuste = Ajuste::findOrFail($id);
        return new AjusteResource($ajuste);
    }

    /**
     * Actualizar un ajuste.
     */
    public function update(UpdateAjusteRequest $request, $id)
    {
        $ajuste = Ajuste::findOrFail($id);
        $ajuste->update($request->validated());
        return new AjusteResource($ajuste);
    }

    /**
     * Eliminar un ajuste.
     */
    public function destroy($id)
    {
        $ajuste = Ajuste::findOrFail($id);
        $ajuste->delete();

        return response()->json(['message' => 'Ajuste eliminado correctamente.']);
    }
}
