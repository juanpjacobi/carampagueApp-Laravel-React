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
            'cliente_id' => 132,
            'direccion_id' => 141,
            'estado_id' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('objetivos')->insert([
            'nombre_objetivo' => 'plaza intendencia',
            'cliente_id' => 133,
            'direccion_id' => 142,
            'estado_id' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('objetivos')->insert([
            'nombre_objetivo' => 'olympus',
            'cliente_id' => 132,
            'direccion_id' => 143,
            'estado_id' => 1,
            'valor_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

}
