<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntregaRopaRequest;
use App\Http\Resources\EntregaRopaCollection;
use App\Http\Resources\EntregaRopaResource;
use App\Http\Resources\LineaRopaResource;
use App\Models\EntregaRopa;
use App\Models\LineaEntregaRopa;
use App\Models\Prenda;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntregaRopaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entregas_ropa = new EntregaRopaCollection(EntregaRopa::all());
        return response(['entregas_ropa' => $entregas_ropa], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EntregaRopaRequest $request)
    {
        $request->validated();

        $stockErrors = [];

        foreach ($request->lineas as $linea) {
            $prenda = Prenda::find($linea['prenda_id']);
            if ($prenda->stock < $linea['cantidad']) {
                $stockErrors[] = "No hay suficiente stock para la prenda: " .
                    $prenda->tipoPrenda->nombre_tipo_prenda . " - " .
                    $prenda->talle->nombre_talle .
                    " (Stock actual: " . $prenda->stock . ")";
            }
        }

        if (!empty($stockErrors)) {
            return response()->json(['message' => 'Errores de stock', 'errors' => $stockErrors], 400);
        }

        DB::beginTransaction();

        try {
            $entrega = EntregaRopa::create([
                'descripcion' => $request->descripcion,
                'fecha' => Carbon::now(),
                'asociado_id' => $request->asociado_id,
            ]);

            foreach ($request->lineas as $linea) {
                $lineaEntrega = LineaEntregaRopa::create([
                    'prenda_id' => $linea['prenda_id'],
                    'entrega_ropa_id' => $entrega->id,
                    'cantidad' => $linea['cantidad'],
                ]);

                $prenda = Prenda::find($linea['prenda_id']);
                $prenda->stock -= $linea['cantidad'];
                $prenda->save();
            }

            DB::commit();

            return response()->json(['entregaRopa' => new EntregaRopaResource($entrega->load('lineas'))], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error processing request: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(EntregaRopa $entregaRopa)
    {
        // Código para mostrar una entrega específica, si es necesario
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EntregaRopaRequest $request, string $id)
    {
        // Validar la solicitud
        $request->validated();

        DB::beginTransaction();

        try {
            // Buscar la entrega de ropa por ID
            $entregaRopa = EntregaRopa::findOrFail($id);

            // Actualizar los datos de la entrega de ropa
            $entregaRopa->descripcion = $request->descripcion;

            // Obtener las líneas de entrega de ropa existentes
            $lineasExistentes = $entregaRopa->lineas;

            // Revertir el stock de las prendas asociadas con las líneas existentes
            foreach ($lineasExistentes as $linea) {
                $prenda = Prenda::find($linea->prenda_id);
                $prenda->stock += $linea->cantidad;
                $prenda->save();
            }

            // Verificar el stock antes de realizar las actualizaciones
            foreach ($request->lineas as $linea) {
                $prenda = Prenda::with('tipoPrenda', 'talle')->find($linea['prenda_id']);
                if ($prenda->stock < $linea['cantidad']) {
                    throw new \Exception("No hay suficiente stock para la prenda: " . $prenda->tipoPrenda->nombre_tipo_prenda . " - Talle: " . $prenda->talle->nombre_talle);
                }
            }

            // Eliminar las líneas de entrega de ropa existentes
            $entregaRopa->lineas()->delete();

            // Crear las nuevas líneas de entrega de ropa y ajustar el stock
            foreach ($request->lineas as $linea) {
                $nuevaLinea = $entregaRopa->lineas()->create([
                    'prenda_id' => $linea['prenda_id'],
                    'cantidad' => $linea['cantidad'],
                ]);

                $prenda = Prenda::find($linea['prenda_id']);
                $prenda->stock -= $linea['cantidad'];
                $prenda->save();
            }

            // Guardar la entrega de ropa actualizada
            $entregaRopa->save();

            DB::commit();

            // Devolver una respuesta exitosa
            return response()->json(['entregaRopa' => new EntregaRopaResource($entregaRopa->load('lineas'))], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al actualizar la entrega de ropa', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EntregaRopa $entregaRopa)
    {
        // Código para eliminar una entrega específica, si es necesario
    }
    public function getLineasPorEntregaId($entregaId)
    {
        // Verifica que $entregaId se reciba correctamente
        // Puedes usar dd($entregaId) para depurar
        $lineas = LineaEntregaRopa::where('entrega_ropa_id', $entregaId)->get();
        return response()->json([
            'lineas' => LineaRopaResource::collection($lineas)
        ], 200);
    }
}
