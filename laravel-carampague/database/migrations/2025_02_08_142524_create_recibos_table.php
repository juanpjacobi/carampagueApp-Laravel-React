<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('recibos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asociado_id');
            $table->string('periodo');
            $table->decimal('total', 10, 2);
            $table->string('pdf_url')->nullable();
            $table->timestamps();
            $table->foreign('asociado_id')->references('id')->on('asociados')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('recibos');
    }
};
