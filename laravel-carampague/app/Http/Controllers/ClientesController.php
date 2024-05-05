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
        $clientes = new ClienteCollection(
            Cliente::with(
                ['direccion.localidad', 'telefono.tipoTelefono']
            )->get()
        );
        return ["clientes" => $clientes];
    }

    public function store(ClienteRequest $request)
    {
        $request->validated();

        $direccion = Direccion::create([
            'calle' => $request->input('calle'),
            'numeracion' => $request->input('numeracion'),
            'barrio' => $request->input('barrio'),
            'piso' => $request->input('piso'),
            'departamento' => $request->input('departamento'),
            'localidad_id' => $request->input('localidad_id'),
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
            'estado_id' => $request->input('estado_id'),
            'condicion_iva_id' => $request->input('condicion_iva_id'),
        ]);

        // Asignar la dirección y el teléfono al cliente
        $cliente->direccion()->associate($direccion);
        $cliente->telefono()->associate($telefono);

        // Guardar el cliente en la base de datos
        $cliente->save();

        // Devolver el cliente insertado

        return ["cliente" => new ClienteResource(Cliente::with(
            ['direccion.localidad', 'telefono.tipoTelefono']
        )->find($cliente->id))];


    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        $cliente = new ClienteResource(Cliente::with(
            ['direccion.localidad', 'telefono.tipoTelefono']
        )->find($cliente->id));
        return ["cliente" => $cliente];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClienteRequest $request, Cliente $cliente)
    {
        $request->validated();

        $cliente = Cliente::findOrFail($cliente->id);

        // Actualizar los datos del cliente
        $cliente->razon_social = $request->input('razon_social');
        $cliente->cuit_cliente = $request->input('cuit_cliente');
        $cliente->estado_id = $request->input('estado_id');
        $cliente->condicion_iva_id = $request->input('condicion_iva_id');

        // Actualizar los datos de la dirección asociada al cliente
        $cliente->direccion->update([
            'calle' => $request->input('calle'),
            'numeracion' => $request->input('numeracion'),
            'barrio' => $request->input('barrio'),
            'piso' => $request->input('piso'),
            'departamento' => $request->input('departamento'),
            'localidad_id' => $request->input('localidad_id'),
        ]);

        // Actualizar los datos del teléfono asociado al cliente
        $cliente->telefono->update([
            'tipo_telefono_id' => $request->input('tipo_telefono_id'),
            'numero_telefono' => $request->input('numero_telefono'),
        ]);

        // Guardar los cambios
        $cliente->save();

        // Devolver una respuesta adecuada
        return response()->json(['cliente' => new ClienteResource($cliente)]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $clientes)
    {
        //
    }
}
