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
        Schema::create('carpetas_medicas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asociado_id');
            $table->string('periodo'); // Formato "YYYY-MM"
            $table->decimal('monto', 10, 2);
            $table->string('pdf_url')->nullable();
            $table->timestamps();

            $table->foreign('asociado_id')->references('id')->on('asociados')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('carpetas_medicas');
    }
};
