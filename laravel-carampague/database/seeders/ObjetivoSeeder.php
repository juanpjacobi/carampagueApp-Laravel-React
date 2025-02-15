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
                'nombre_objetivo' => "Objetivo $i",
                'activo'          => 1,
                // Asumimos que existen al menos 10 direcciones y 10 clientes
                'direccion_id'    => $i, // Se asigna la dirección correspondiente
                'cliente_id'      => $i, // Se asigna el cliente correspondiente
                'created_at'      => $currentTimestamp,
                'updated_at'      => $currentTimestamp,
            ];
        })->toArray();

        DB::table('objetivos')->insert($objetivos);
    }
}
