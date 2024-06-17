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
        Schema::table('entregas_ropa', function (Blueprint $table) {
            $table->foreignId('asociado_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entregas_ropa', function (Blueprint $table) {


            // 1. Drop foreign key constraints
            $table->dropForeign(['asociado_id']);

            // 2. Drop the column
            $table->dropColumn('asociado_id');
        });
    }
};
