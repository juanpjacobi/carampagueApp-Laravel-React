<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('lineas_recibo', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recibo_id');
            $table->string('descripcion');
            $table->integer('horas')->default(0);
            $table->decimal('valor_hora', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->boolean('es_ajuste')->default(false);
            $table->timestamps();

            $table->foreign('recibo_id')->references('id')->on('recibos')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('lineas_recibo');
    }
};
