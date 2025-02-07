<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposAjustesTable extends Migration
{
    public function up()
    {
        Schema::create('tipos_ajustes', function (Blueprint $table) {
            $table->id();
            $table->string('concepto');
            $table->boolean('add');
            $table->decimal('monto', 8, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipos_ajustes');
    }
}
