<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObjetivoSeeder extends Seeder
{
    public function run()
    {
        $currentTimestamp = Carbon::now();

        // Se crean 10 objetivos
        $objetivos = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
            return [
                'nombre_objetivo' => "Objetivo " . sprintf("%02d", $i), // Agrega ceros a la izquierda
                'activo'          => 1,
                'direccion_id'    => $i,
                'cliente_id'      => $i,
                'created_at'      => $currentTimestamp,
                'updated_at'      => $currentTimestamp,
            ];
        })->toArray();

        DB::table('objetivos')->insert($objetivos);
    }
}
