<?php

use App\Http\Controllers\AsociadosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\CondicionIvaController;
use App\Http\Controllers\EstadoCivilController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\ObjetivosController;
use App\Http\Controllers\ProvinciaController;
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

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/tipos-telefono', TipoTelefonoController::class);
    Route::apiResource('/condiciones-iva', CondicionIvaController::class);
    Route::apiResource('/provincias', ProvinciaController::class);
    Route::apiResource('/localidades', LocalidadController::class);
    Route::apiResource('/estados', EstadoController::class);
    Route::apiResource('/clientes', ClientesController::class);
    Route::apiResource('/objetivos', ObjetivosController::class);
    Route::apiResource('/estados-civiles', EstadoCivilController::class);
    Route::apiResource('/asociados', AsociadosController::class);
    Route::post('/upload', [UploadImageController::class, 'uploadImage']);


});


Route::post('/login', [AuthController::class, 'login']);
