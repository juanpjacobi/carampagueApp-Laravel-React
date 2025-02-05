<?php

use App\Http\Controllers\AsociadosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarrioController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\CondicionIvaController;
use App\Http\Controllers\DocumentacionController;
use App\Http\Controllers\EntregaRopaController;
use App\Http\Controllers\EstadoCivilController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\EstadoDocumentacionController;
use App\Http\Controllers\FeriadoController;
use App\Http\Controllers\LineaDocumentacionController;
use App\Http\Controllers\LineaEntregaRopaController;
use App\Http\Controllers\LineaServicioController;
use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\MotivoController;
use App\Http\Controllers\ObjetivosController;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\TalleController;
use App\Http\Controllers\TipoDocumentacionController;
use App\Http\Controllers\TipoMotivoController;
use App\Http\Controllers\TipoPrendaController;
use App\Http\Controllers\TipoTelefonoController;
use App\Http\Controllers\UploadImageController;
use App\Http\Controllers\ValorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::apiResource('/asociados', AsociadosController::class);
    Route::apiResource('/barrios', BarrioController::class);
    Route::apiResource('/clientes', ClientesController::class);
    Route::apiResource('/condiciones-iva', CondicionIvaController::class);
    Route::apiResource('/documentaciones', DocumentacionController::class);
    Route::apiResource('/entrega-ropa', EntregaRopaController::class);
    Route::apiResource('/estados-civiles', EstadoCivilController::class);
    Route::apiResource('/estados-documentacion', EstadoDocumentacionController::class);
    Route::apiResource('/feriados', FeriadoController::class);
    Route::apiResource('/lineas-documentacion', LineaDocumentacionController::class);
    Route::apiResource('/lineas-ropa', LineaEntregaRopaController::class);
    Route::apiResource('/lineas-servicio', LineaServicioController::class);
    Route::apiResource('/localidades', LocalidadController::class);
    Route::apiResource('/modalidades', ModalidadesController::class);
    Route::apiResource('/motivos', MotivoController::class);
    Route::apiResource('/objetivos', ObjetivosController::class);
    Route::apiResource('/prendas', PrendaController::class);
    Route::apiResource('/provincias', ProvinciaController::class);
    Route::apiResource('/servicios', ServicioController::class);
    Route::apiResource('/talles', TalleController::class);
    Route::apiResource('/tipos-documentacion', TipoDocumentacionController::class);
    Route::apiResource('/tipos-motivos', TipoMotivoController::class);
    Route::apiResource('/tipos-prenda', TipoPrendaController::class);
    Route::apiResource('/tipos-telefono', TipoTelefonoController::class);
    Route::apiResource('/valores', ValorController::class);
    Route::get('/asociados/totales/{id}', [ServicioController::class, 'obtenerTotalesPorAsociado'])->name('asociados.totales');
    Route::get('/entrega-ropa/detalle/{entregaId}', [EntregaRopaController::class, 'getLineasPorEntregaId']);
    Route::get('/servicios/totales/{id}', [ServicioController::class, 'obtenerTotales'])->name('servicios.totales');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/servicios/{id}/generar-lineas-plan-diario', [ServicioController::class, 'generarLineasPlanDiario']);
    Route::post('/servicios/{id}/generar-lineas', [ServicioController::class, 'generarLineas'])->name('servicios.generar-lineas');
    Route::put('/asociados/{id}/toggle', [AsociadosController::class, 'toggleActivo']);
    Route::put('/clientes/{id}/toggle', [ClientesController::class, 'toggleActivo']);
    Route::put('/objetivos/{id}/toggle', [ObjetivosController::class, 'toggleActivo']);
    Route::put('/usuarios/{id}/toggle', [ObjetivosController::class, 'toggleActivo']);
    Route::put('lineas-servicio/{id}/actualizar-horas', [LineaServicioController::class, 'actualizarHoras'])->name('lineas-servicio.actualizar-horas');
    Route::put('lineas-servicio/{id}/asignar-asociado', [LineaServicioController::class, 'asignarAsociado'])->name('lineas-servicio.asignar-asociado');
    Route::put('/lineas-servicio/{id}/toggle-justificado', [LineaServicioController::class, 'toggleJustificado'])->name('lineas-servicio.toggle-justificado');
    Route::put('lineas-servicio/{id}/toggle-validado', [LineaServicioController::class, 'toggleValidado'])->name('lineas-servicio.toggle-validado');

    /*  */
    Route::post('/upload', [UploadImageController::class, 'uploadImage']);
});

Route::post('/login', [AuthController::class, 'login']);
