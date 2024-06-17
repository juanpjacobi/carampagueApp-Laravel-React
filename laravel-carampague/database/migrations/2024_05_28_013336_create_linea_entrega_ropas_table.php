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
        Schema::create('linea_entrega_ropas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prenda_id')->constrained()->onDelete('cascade');
            $table->foreignId('entrega_ropa_id')->constrained('entregas_ropa')->onDelete('cascade');
            $table->tinyInteger('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('linea_entrega_ropas');
    }
};
