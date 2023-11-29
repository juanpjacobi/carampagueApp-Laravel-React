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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('razon_social', 100);
            $table->integer('cuit_cliente');
            $table->foreignId('estado_id')->constrained()->onDelete('cascade');
            $table->foreignId('condicion_iva_id')->constrained('condicion_iva')->onDelete('cascade');
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
        Schema::dropIfExists('clientes');
    }
};
