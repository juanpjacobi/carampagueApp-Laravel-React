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
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id();
            $table->string('calle', 50);
            $table->string('numeracion', 50);
            $table->string('barrio', 50);
            $table->smallInteger('piso');
            $table->string('departamento', 5);
            $table->foreignId('localidad_id')->constrained('localidades')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**d
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direcciones');
    }
};
