<?php

namespace App\Http\Controllers;

use App\Http\Requests\ObjetivoRequest;
use App\Http\Resources\ObjetivoCollection;
use App\Http\Resources\ObjetivoResource;
use App\Models\Direccion;
use App\Models\Objetivo;
use Illuminate\Support\Facades\DB;

class ObjetivosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $objetivos = new ObjetivoCollection(Objetivo::all());
        return response(["objetivos" =>  ($objetivos)], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ObjetivoRequest $request)
    {
        $request->validated();
        DB::beginTransaction();
        try {

        // Crear una nueva dirección
        $direccion = Direccion::create([
            'calle' => $request->input('calle'),
            'numeracion' => $request->input('numeracion'),
            'piso' => $request->input('piso'),
            'departamento' => $request->input('departamento'),
            'barrio_id' => $request->input('barrio_id'),
        ]);


        // Crear un nuevo objetivo
        $objetivo = new Objetivo([
            'nombre_objetivo' => $request->input('nombre_objetivo'),
            'cliente_id' => $request->input('cliente_id'),
            'activo' => $request->input('activo'),
        ]);

        // Asignar la dirección y el valor al objetivo
        $objetivo->direccion()->associate($direccion);

        // Guardar el objetivo en la base de datos
        $objetivo->save();


        DB::commit();
        return response(["objetivo" => new ObjetivoResource(Objetivo::find($objetivo->id))], 201);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['message' => 'Error al crear el objetivo: ' . $e->getMessage()], 500);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $objetivo = Objetivo::find($id);
        return response(['objetivo' => new ObjetivoResource($objetivo)], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ObjetivoRequest $request, string $id)
    {
        $request->validated();
        DB::beginTransaction();
        try {

        // Buscar el objetivo por su ID
        $objetivo = Objetivo::findOrFail($id);

        // Actualizar los datos del objetivo
        $objetivo->nombre_objetivo = $request->input('nombre_objetivo');
        $objetivo->cliente_id = $request->input('cliente_id');
        $objetivo->activo = $request->input('activo');

        // Actualizar la dirección del asociado si se proporcionan datos
        if ($request->has('calle') || $request->has('numeracion') || $request->has('piso') || $request->has('departamento') || $request->has('barrio_id')) {
            $objetivo->direccion->update([
                'calle' => $request->input('calle'),
                'numeracion' => $request->input('numeracion'),
                'piso' => $request->input('piso'),
                'departamento' => $request->input('departamento'),
                'barrio_id' => $request->input('barrio_id'),
            ]);
        }


        // Guardar los cambios
        $objetivo->save();


        DB::commit();
        return response(['objetivo' => new ObjetivoResource($objetivo)], 200);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['message' => 'Error al crear el objetivo: ' . $e->getMessage()], 500);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function toggleActivo($id)
    {
        $objetivo = Objetivo::findOrFail($id);
        $objetivo->activo = !$objetivo->activo;
        $objetivo->save();

        return response([
            'message' => 'Estado del objetivo actualizado con éxito',
            'activo' => $objetivo->activo,
            'objetivo' => new ObjetivoResource($objetivo)
        ], 200);
    }
}
