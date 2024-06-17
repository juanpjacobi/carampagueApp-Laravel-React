<?php

namespace App\Http\Controllers;

use App\Http\Requests\AsociadoRequest;
use App\Http\Resources\AsociadoCollection;
use App\Http\Resources\AsociadoResource;
use App\Models\Asociado;
use App\Models\Direccion;
use App\Models\Documentacion;
use App\Models\Telefono;
use Illuminate\Support\Facades\DB;

class AsociadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $asociados = new AsociadoCollection(Asociado::all());
        return response(["asociados" => $asociados], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(AsociadoRequest $request, UploadImageController $uploadImageController)
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

            // Crear un nuevo teléfono
            $telefono = Telefono::create([
                'tipo_telefono_id' => $request->input('tipo_telefono_id'),
                'numero_telefono' => $request->input('numero_telefono'),
            ]);

            // Crear una nueva documentación
            $documentacion = Documentacion::create([
                'descripcion' => 'Documentacion del ascociado:' . $request->input('nombre_asociado') . $request->input('apellido_asociado'),
            ]);

            // Crear un nuevo asociado
            $asociado = new Asociado([
                'nombre_asociado' => $request->input('nombre_asociado'),
                'apellido_asociado' => $request->input('apellido_asociado'),
                'image_url' => "noimage",
                'fecha_alta' => $request->input('fecha_alta'),
                'fecha_baja' => $request->input('fecha_baja'),
                'numero_asociado' => $request->input('numero_asociado'),
                'cuit_asociado' => $request->input('cuit_asociado'),
                'fecha_nacimiento' => $request->input('fecha_nacimiento'),
                'activo' => $request->input('activo'),
                'estado_civil_id' => $request->input('estado_civil_id'),
            ]);

            // Asignar la dirección, el teléfono y la documentación al asociado
            $asociado->direccion()->associate($direccion);
            $asociado->telefono()->associate($telefono);
            $asociado->documentacion()->associate($documentacion);

            // Guardar el asociado en la base de datos
            $asociado->save();

            DB::commit();
            return response(["asociado" => new AsociadoResource(Asociado::find($asociado->id))], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el asociado: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $asociado = new AsociadoResource(Asociado::find($id));
        return response(["asociado" => $asociado], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AsociadoRequest $request, string $id)
    {
        $request->validated();

        DB::beginTransaction();
        try {
            // Buscar el asociado por su ID
            $asociado = Asociado::findOrFail($id);
            $asociado->nombre_asociado = $request->input('nombre_asociado');
            $asociado->apellido_asociado = $request->input('apellido_asociado');
            $asociado->fecha_alta = $request->input('fecha_alta');
            $asociado->fecha_baja = $request->input('fecha_baja');
            $asociado->numero_asociado = $request->input('numero_asociado');
            $asociado->cuit_asociado = $request->input('cuit_asociado');
            $asociado->fecha_nacimiento = $request->input('fecha_nacimiento');
            $asociado->activo = $request->input('activo');
            $asociado->estado_civil_id = $request->input('estado_civil_id');

            // Actualizar la dirección del asociado si se proporcionan datos
            if ($request->has('calle') || $request->has('numeracion') || $request->has('piso') || $request->has('departamento') || $request->has('barrio_id')) {
                $asociado->direccion->update([
                    'calle' => $request->input('calle'),
                    'numeracion' => $request->input('numeracion'),
                    'piso' => $request->input('piso'),
                    'departamento' => $request->input('departamento'),
                    'barrio_id' => $request->input('barrio_id'),
                ]);
            }

            // Actualizar el teléfono del asociado si se proporcionan datos
            if ($request->has('tipo_telefono_id') || $request->has('numero_telefono')) {
                $asociado->telefono->update([
                    'tipo_telefono_id' => $request->input('tipo_telefono_id'),
                    'numero_telefono' => $request->input('numero_telefono'),
                ]);
            }

            // Actualizar la imagen del asociado si se proporciona una nueva URL de imagen
            if ($request->has('image_url')) {
                $asociado->update([
                    'image_url' => $request->input('image_url'),
                ]);
            }
            $asociado->save();
            DB::commit();

            return response()->json(['asociado' => new AsociadoResource($asociado)]);
            return response(["asociado" => new AsociadoResource(Asociado::find($asociado->id))], 200);
        } catch (\Exception $e) {
            // En caso de error, revertir la transacción
            DB::rollback();

            // Devolver un mensaje de error
            return response()->json(['message' => 'Error al actualizar el asociado: ' . $e->getMessage()], 500);
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
        $asociado = Asociado::findOrFail($id);
        $asociado->activo = !$asociado->activo;
        $asociado->save();

        return response()->json([
            'message' => 'Estado del asociado actualizado con éxito',
            'activo' => $asociado->activo,
            'asociado' => new AsociadoResource($asociado)
        ], 200);
    }
}
