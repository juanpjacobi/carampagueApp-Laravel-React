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

        Schema::table('clientes', function (Blueprint $table) {
            $table->dropColumn('activo');

        });
        Schema::table('objetivos', function (Blueprint $table) {
            $table->dropColumn('activo');

        });
        Schema::table('asociados', function (Blueprint $table) {
            $table->dropColumn('activo');
        });

        Schema::table('clientes', function (Blueprint $table) {
            $table->boolean('activo');

        });
        Schema::table('objetivos', function (Blueprint $table) {
            $table->boolean('activo');

        });
        Schema::table('asociados', function (Blueprint $table) {
            $table->boolean('activo');

        });
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('activo');
            $table->dropForeign(['estado_id']);
            $table->dropColumn('estado_id');
        });
        Schema::dropIfExists('estados');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropColumn('activo');

        });
        Schema::table('objetivos', function (Blueprint $table) {
            $table->dropColumn('activo');

        });
        Schema::table('asociados', function (Blueprint $table) {
            $table->dropColumn('activo');
        });
    }
};
