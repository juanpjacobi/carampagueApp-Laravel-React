<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use App\Http\Requests\ClienteRequest;
use App\Http\Resources\ClienteCollection;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use App\Models\Direccion;
use App\Models\Telefono;


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
        $data = $request->validated();

        DB::beginTransaction();
        try {
            // Crear una nueva dirección
            $direccion = Direccion::create([
                'calle' => $data['calle'],
                'numeracion' => $data['numeracion'],
                'piso' => $data['piso'],
                'departamento' => $data['departamento'],
                'barrio_id' => $data['barrio_id'],
            ]);

            // Crear un nuevo teléfono
            $telefono = Telefono::create([
                'tipo_telefono_id' => $data['tipo_telefono_id'],
                'numero_telefono' => $data['numero_telefono'],
            ]);

            // Crear el cliente
            $cliente = new Cliente([
                'razon_social' => $data['razon_social'],
                'cuit_cliente' => $data['cuit_cliente'],
                'email' => $data['email'],
                'activo' => $data['activo'],
                'condicion_iva_id' => $data['condicion_iva_id'],
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
            return response()->json(['message' => 'Error al crear el cliente: ' . $e->getMessage()], 500);
        }
    }


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
        $data = $request->validated();

        DB::beginTransaction();
        try {
            // Actualizar los datos del cliente
            $cliente->update([
                'razon_social' => $data['razon_social'],
                'cuit_cliente' => $data['cuit_cliente'],
                'email' => $data['email'],
                'activo' => $data['activo'],
                'condicion_iva_id' => $data['condicion_iva_id'],
            ]);

            // Actualizar los datos de la dirección y teléfono si es necesario
            if ($request->has('calle')) {
                $cliente->direccion->update([
                    'calle' => $data['calle'],
                    'numeracion' => $data['numeracion'],
                    'piso' => $data['piso'],
                    'departamento' => $data['departamento'],
                    'barrio_id' => $data['barrio_id'],
                ]);
            }

            if ($request->has('numero_telefono')) {
                $cliente->telefono->update([
                    'tipo_telefono_id' => $data['tipo_telefono_id'],
                    'numero_telefono' => $data['numero_telefono'],
                ]);
            }



            DB::commit();

            return response(["cliente" => new ClienteResource($cliente)], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al actualizar el cliente: ' . $e->getMessage()], 500);
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
