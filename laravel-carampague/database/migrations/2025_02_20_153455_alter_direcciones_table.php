<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('direcciones', function (Blueprint $table) {
            // Cambiar las columnas "piso" y "departamento" para que sean nullable
            $table->string('piso')->nullable()->change();
            $table->string('departamento')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('direcciones', function (Blueprint $table) {
            // Revertir: hacer que las columnas no sean nullable y asignar un valor por defecto vacío
            $table->string('piso')->default('')->nullable(false)->change();
            $table->string('departamento')->default('')->nullable(false)->change();
        });
    }
};
