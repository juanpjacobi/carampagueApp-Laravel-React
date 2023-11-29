<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ClienteRequest;
use App\Http\Resources\ClienteCollection;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = new ClienteCollection(Cliente::with(
            ['direccion.localidad', 'telefono.tipoTelefono'])->get()
        );
        return $clientes;
    }

    public function store(ClienteRequest $request)
    {
        $data = $request->validated();

        $razonSocial = $request->input('razon_social');
        $cuitCliente = $request->input('cuit_cliente');
        $email = $request->input('email');
        $estadoId = $request->input('estado_id');
        $condicionIvaId = $request->input('condicion_iva_id');
        $calle = $request->input('calle');
        $numeracion = $request->input('numeracion');
        $barrio = $request->input('barrio');
        $piso = $request->input('piso');
        $departamento = $request->input('departamento');
        $localidadId = $request->input('localidad_id');
        $tipoTelefonoId = $request->input('tipo_telefono_id');
        $numeroTelefono = $request->input('numero_telefono');

        // Llama al procedimiento almacenado
        DB::statement("CALL CrearCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            $razonSocial, $cuitCliente, $email, $estadoId, $condicionIvaId, $calle, $numeracion,
            $barrio, $piso, $departamento, $localidadId, $tipoTelefonoId, $numeroTelefono
        ]);

        return ["cliente" => $data];
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return new ClienteResource(Cliente::with(
            ['direccion.localidad', 'telefono.tipoTelefono']
            )->find($cliente->id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $clientes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $clientes)
    {
        //
    }
}
