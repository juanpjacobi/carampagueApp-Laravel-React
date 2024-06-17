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
        Schema::create('lineas_documentacion', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_solicitud');
            $table->date('fecha_entrega')->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->string('observaciones', 500);
            $table->foreignId('tipo_documentacion_id')->constrained('tipos_documentacion')->onDelete('cascade');
            $table->foreignId('estado_documentacion_id')->constrained('estados_documentacion')->onDelete('cascade');
            $table->foreignId('documentacion_id')->constrained('documentaciones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lineas_documentacion');
    }
};
