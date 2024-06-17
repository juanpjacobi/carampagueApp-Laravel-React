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
use App\Http\Controllers\LineaDocumentacionController;
use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\ObjetivosController;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\TalleController;
use App\Http\Controllers\TipoDocumentacionController;
use App\Http\Controllers\TipoPrendaController;
use App\Http\Controllers\TipoTelefonoController;
use App\Http\Controllers\UploadImageController;
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
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/tipos-telefono', TipoTelefonoController::class);
    Route::apiResource('/condiciones-iva', CondicionIvaController::class);
    Route::apiResource('/provincias', ProvinciaController::class);
    Route::apiResource('/localidades', LocalidadController::class);
    Route::apiResource('/documentaciones', DocumentacionController::class);
    Route::apiResource('/estados-documentacion', EstadoDocumentacionController::class);
    Route::apiResource('/tipos-documentacion', TipoDocumentacionController::class);
    Route::apiResource('/talles', TalleController::class);
    Route::apiResource('/barrios', BarrioController::class);
    Route::put('/asociados/{id}/toggle', [AsociadosController::class, 'toggleActivo']);
    Route::put('/clientes/{id}/toggle', [ClientesController::class, 'toggleActivo']);
    Route::put('/objetivos/{id}/toggle', [ObjetivosController::class, 'toggleActivo']);
    Route::put('/usuarios/{id}/toggle', [ObjetivosController::class, 'toggleActivo']);



    Route::apiResource('/tipos-prenda', TipoPrendaController::class);
    Route::apiResource('/prendas', PrendaController::class);
    Route::apiResource('/lineas-documentacion', LineaDocumentacionController::class);
    Route::apiResource('/clientes', ClientesController::class);
    Route::apiResource('/objetivos', ObjetivosController::class);
    Route::apiResource('/estados-civiles', EstadoCivilController::class);
    Route::apiResource('/asociados', AsociadosController::class);
    Route::apiResource('/entrega-ropa', EntregaRopaController::class);

    Route::post('/upload', [UploadImageController::class, 'uploadImage']);
});

Route::post('/login', [AuthController::class, 'login']);
