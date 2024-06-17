<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use App\Http\Requests\ClienteRequest;
use App\Http\Resources\ClienteCollection;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = new ClienteCollection(Cliente::all());
        return response(["clientes" => $clientes], 200);
    }

    public function store(ClienteRequest $request)
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

            // Crear un nuevo cliente
            $cliente = new Cliente([
                'razon_social' => $request->input('razon_social'),
                'cuit_cliente' => $request->input('cuit_cliente'),
                'email' => $request->input('email'),
                'activo' => $request->input('activo'),
                'condicion_iva_id' => $request->input('condicion_iva_id'),
            ]);

            // Asignar la dirección y el teléfono al cliente
            $cliente->direccion()->associate($direccion);
            $cliente->telefono()->associate($telefono);

            // Guardar el cliente en la base de datos
            $cliente->save();
            DB::commit();

            // Devolver el cliente insertado
            return response(["cliente" => new ClienteResource(Cliente::find($cliente->id))], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el asociado: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        $cliente = new ClienteResource(Cliente::find($cliente->id));
        return response(["cliente" => $cliente], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClienteRequest $request, Cliente $cliente)
    {

        $request->validated();
        DB::beginTransaction();
        try {

            $cliente = Cliente::findOrFail($cliente->id);

            // Actualizar los datos del cliente
            $cliente->razon_social = $request->input('razon_social');
            $cliente->cuit_cliente = $request->input('cuit_cliente');
            $cliente->activo = $request->input('activo');
            $cliente->condicion_iva_id = $request->input('condicion_iva_id');

            // Actualizar los datos de la dirección asociada al cliente
            if ($request->has('calle') || $request->has('numeracion') || $request->has('piso') || $request->has('departamento') || $request->has('barrio_id')) {
                $cliente->direccion->update([
                    'calle' => $request->input('calle'),
                    'numeracion' => $request->input('numeracion'),
                    'piso' => $request->input('piso'),
                    'departamento' => $request->input('departamento'),
                    'barrio_id' => $request->input('barrio_id'),
                ]);
            }

            // Actualizar los datos del teléfono asociado al cliente
            $cliente->telefono->update([
                'tipo_telefono_id' => $request->input('tipo_telefono_id'),
                'numero_telefono' => $request->input('numero_telefono'),
            ]);

            // Guardar los cambios
            $cliente->save();
            DB::commit();

            // Devolver una respuesta adecuada
            return response((['cliente' => new ClienteResource($cliente)]), 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el asociado: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $clientes)
    {
        //
    }

    public function toggleActivo($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->activo = !$cliente->activo;
        $cliente->save();

        return response(([
            'message' => 'Estado del cliente actualizado con éxito',
            'activo' => $cliente->activo,
            'cliente' => new ClienteResource($cliente)
        ]), 200);
    }
}
