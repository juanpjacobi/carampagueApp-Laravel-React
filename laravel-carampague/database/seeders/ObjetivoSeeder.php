<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObjetivoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('objetivos')->insert([
            'nombre_objetivo' => 'olympus',
            'cliente_id' => 1,
            'direccion_id' => 1,
            'activo' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('objetivos')->insert([
            'nombre_objetivo' => 'plaza intendencia',
            'cliente_id' => 2,
            'direccion_id' => 2,
            'activo' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('objetivos')->insert([
            'nombre_objetivo' => 'olympus',
            'cliente_id' => 3,
            'direccion_id' => 3,
            'activo' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

}
