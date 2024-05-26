<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asociados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_asociado', '200');
            $table->string('apellido_asociado', '200');
            $table->string('image_url', '500');
            $table->date('fecha_alta');
            $table->date('fecha_baja')->nullable();
            $table->smallInteger('numero_asociado');
            $table->bigInteger('cuit_asociado');
            $table->date('fecha_nacimiento');
            $table->foreignId('estado_id')->constrained()->onDelete('cascade');
            $table->foreignId('documentacion_id')->constrained('documentaciones')->onDelete('cascade');
            $table->foreignId('estado_civil_id')->constrained('estados_civiles')->onDelete('cascade');
            $table->foreignId('telefono_id')->constrained()->onDelete('cascade');
            $table->foreignId('direccion_id')->constrained('direcciones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asociados');
    }
};
