<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAjustesTable extends Migration
{
    public function up()
    {
        Schema::create('ajustes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asociado_id')->nullable();
            $table->boolean('global')->default(false);
            $table->unsignedBigInteger('tipo_ajuste_id');
            $table->decimal('monto', 8, 2)->nullable();
            $table->string('periodo_inicio')->nullable();
            $table->unsignedInteger('duracion_meses')->default(1)->nullable();
            $table->timestamps();

            $table->foreign('asociado_id')
                ->references('id')
                ->on('asociados')
                ->onDelete('cascade');

            $table->foreign('tipo_ajuste_id')
                ->references('id')
                ->on('tipos_ajustes')
                ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ajustes');
    }
}
