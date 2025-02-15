<?php

namespace App\Http\Controllers;

use App\Models\Valor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ValorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $valores = Valor::all();
        return response(['valores' => $valores]);
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
        // Validación
        $validatedData = $request->validate([
            'valor_vigilador' => 'required|numeric|min:0',
            'valor_cliente' => 'required|numeric|min:0|gt:valor_vigilador',
            'periodo' => 'required|string|size:7|regex:/^\d{4}-\d{2}$/',
            'cliente_id' => 'required|exists:clientes,id',
            'objetivo_id' => 'nullable|exists:objetivos,id,cliente_id,' . $request->cliente_id, // Validar que el objetivo_id pertenece al cliente
        ]);

        // Verificar si ya existe un valor para este cliente, periodo y objetivo_id
        $existeValor = Valor::where('cliente_id', $request->cliente_id)
            ->where('periodo', $request->periodo)
            ->where(function ($query) use ($request) {
                if ($request->has('objetivo_id') && $request->objetivo_id !== null) {
                    $query->where('objetivo_id', $request->objetivo_id);
                } else {
                    $query->whereNull('objetivo_id');
                }
            })
            ->exists();

        if ($existeValor) {
            return response()->json(['message' => 'Ya existe un valor para este cliente y periodo con el objetivo especificado.'], 400);
        }

        // Si la validación pasa, guardamos el nuevo valor
        DB::beginTransaction();
        try {
            // Crear el nuevo valor
            $valor = new Valor([
                'valor_vigilador' => $validatedData['valor_vigilador'],
                'valor_cliente' => $validatedData['valor_cliente'],
                'periodo' => $validatedData['periodo'],
                'cliente_id' => $validatedData['cliente_id'],
            ]);

            // Si se pasa un objetivo_id, lo asignamos
            if ($request->has('objetivo_id')) {
                $valor->objetivo_id = $request->objetivo_id;
            }

            // Guardar el valor
            $valor->save();

            DB::commit();

            return response()->json(['message' => 'Valor hora creado correctamente.', 'valor' => $valor], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el valor hora: ' . $e->getMessage()], 500);
        }
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

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'valor_vigilador' => 'required|numeric',
            'valor_cliente' => 'required|numeric',
            'cliente_id' => 'required|exists:clientes,id', // Validamos el cliente
            'periodo' => 'required|string', // Validamos el periodo (YYYY-MM)
        ]);

        try {
            $valor = Valor::findOrFail($id);
            // Actualizamos el valor
            $valor->update([
                'valor_vigilador' => $data['valor_vigilador'],
                'valor_cliente' => $data['valor_cliente'],
                'cliente_id' => $data['cliente_id'], // Actualizamos el cliente
                'periodo' => $data['periodo'], // Actualizamos el periodo
            ]);

            return response()->json([
                'message' => 'Valor actualizado exitosamente.',
                'valor' => $valor,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el valor: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
