<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarriosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentTimestamp = Carbon::now();

        $barrios = [
            ['nombre_barrio' => 'Nueva Córdoba', 'localidad_id' => 1, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'Alberdi', 'localidad_id' => 2, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'General Paz', 'localidad_id' => 3, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'Cerro de las Rosas', 'localidad_id' => 1, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'Jardín', 'localidad_id' => 2, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'Villa Cabrera', 'localidad_id' => 3, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'San Vicente', 'localidad_id' => 1, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
            ['nombre_barrio' => 'Quintas de Argüello', 'localidad_id' => 2, 'created_at' => $currentTimestamp, 'updated_at' => $currentTimestamp],
        ];

        DB::table('barrios')->insert($barrios);

    }
}
