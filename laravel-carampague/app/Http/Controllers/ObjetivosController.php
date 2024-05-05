<?php

namespace App\Http\Controllers;

use App\Http\Requests\ObjetivoRequest;
use App\Http\Resources\ObjetivoCollection;
use App\Http\Resources\ObjetivoResource;
use App\Models\Direccion;
use App\Models\Objetivo;
use App\Models\Valor;
use Illuminate\Support\Facades\DB;

class ObjetivosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $objetivos = Objetivo::all();
        return ["objetivos" => new ObjetivoCollection($objetivos)];
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ObjetivoRequest $request)
    {
        $request->validated();

        // Crear una nueva dirección
        $direccion = Direccion::create([
            'calle' => $request->input('calle'),
            'numeracion' => $request->input('numeracion'),
            'barrio' => $request->input('barrio'),
            'piso' => $request->input('piso'),
            'departamento' => $request->input('departamento'),
            'localidad_id' => $request->input('localidad_id'),
        ]);

        // Crear un nuevo valor
        $valor = Valor::create([
            'valor_vigilador' => $request->input('valor_vigilador'),
            'valor_cliente' => $request->input('valor_cliente'),
        ]);

        // Crear un nuevo objetivo
        $objetivo = new Objetivo([
            'nombre_objetivo' => $request->input('nombre_objetivo'),
            'cliente_id' => $request->input('cliente_id'),
            'estado_id' => $request->input('estado_id'),
        ]);

        // Asignar la dirección y el valor al objetivo
        $objetivo->direccion()->associate($direccion);
        $objetivo->valor()->associate($valor);

        // Guardar el objetivo en la base de datos
        $objetivo->save();

        // Devolver una respuesta adecuada
        return ['objetivo' => new ObjetivoResource($objetivo)];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $objetivo = Objetivo::with(['direccion.localidad'])->find($id);
        return ['objetivo' => new ObjetivoResource($objetivo)];
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ObjetivoRequest $request, string $id)
    {
        $request->validated();

        // Buscar el objetivo por su ID
        $objetivo = Objetivo::findOrFail($id);

        // Actualizar los datos del objetivo
        $objetivo->nombre_objetivo = $request->input('nombre_objetivo');
        $objetivo->cliente_id = $request->input('cliente_id');
        $objetivo->estado_id = $request->input('estado_id');

        // Actualizar los datos de la dirección asociada al objetivo
        $objetivo->direccion->update([
            'calle' => $request->input('calle'),
            'numeracion' => $request->input('numeracion'),
            'barrio' => $request->input('barrio'),
            'piso' => $request->input('piso'),
            'departamento' => $request->input('departamento'),
            'localidad_id' => $request->input('localidad_id'),
        ]);

        // Actualizar los datos del valor asociado al objetivo
        $objetivo->valor->update([
            'valor_vigilador' => $request->input('valor_vigilador'),
            'valor_cliente' => $request->input('valor_cliente'),
        ]);

        // Guardar los cambios
        $objetivo->save();

        // Devolver una respuesta adecuada
        return ['objetivo' => new ObjetivoResource($objetivo)];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
