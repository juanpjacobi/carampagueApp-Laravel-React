<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposMotivosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipos_motivos')->insert([
            [
                'nombre_tipo_motivo' => 'Ausente por enfermedad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre_tipo_motivo' => 'Licencia personal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre_tipo_motivo' => 'Accidente laboral',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre_tipo_motivo' => 'Otro',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
