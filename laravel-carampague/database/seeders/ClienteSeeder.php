<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $currentTimestamp = Carbon::now();

        // Se asume que ya existen al menos 10 direcciones y 10 teléfonos.
        // Si lo deseas, puedes asignar de forma aleatoria:
        // $direccionId = rand(1, 10);
        // $telefonoId  = rand(1, 10);
        // En este ejemplo usaremos el índice del loop (del 1 al 10).

        $clientes = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
            return [
                'razon_social'     => "Cliente " . sprintf("%02d", $i), // Agrega ceros a la izquierda
                'cuit_cliente'     => 20349000000 + $i, // ejemplo de cuit
                'email'            => "cliente{$i}@ejemplo.com",
                'condicion_iva_id' => 1, // asumiendo que la condición 1 existe
                'activo'           => 1,
                'telefono_id'      => $i,
                'direccion_id'     => $i,
                'created_at'       => $currentTimestamp,
                'updated_at'       => $currentTimestamp,
            ];
        })->toArray();

        DB::table('clientes')->insert($clientes);
    }
}
