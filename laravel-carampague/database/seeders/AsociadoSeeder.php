<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsociadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $currentTimestamp = Carbon::now();

                // Insertar 10 documentaciones
                $documentaciones = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
                    return [
                        'descripcion' => "Documentación $i",
                        'created_at'  => $currentTimestamp,
                        'updated_at'  => $currentTimestamp,
                    ];
                })->toArray();

                DB::table('documentaciones')->insert($documentaciones);

        // Crear 10 direcciones
        $direcciones = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
            return [
                'calle'         => "Calle $i",
                'numeracion'    => $i * 10,
                'piso'          => $i,
                'departamento'  => "$i",
                'barrio_id'     => 1, // Suponiendo que el barrio 1 existe
                'created_at'    => $currentTimestamp,
                'updated_at'    => $currentTimestamp,
            ];
        })->toArray();

        DB::table('direcciones')->insert($direcciones);

        // Crear 10 telefonos
        $telefonos = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
            return [
                'tipo_telefono_id' => 1, // Suponiendo que el tipo 1 existe
                'numero_telefono'  => "5554010$i", // Ejemplo de número de teléfono
                'created_at'       => $currentTimestamp,
                'updated_at'       => $currentTimestamp,
            ];
        })->toArray();

        DB::table('telefonos')->insert($telefonos);

        // Crear 10 asociados, relacionando cada uno con la dirección y teléfono correspondiente
        $asociados = collect(range(1, 10))->map(function ($i) use ($currentTimestamp) {
            return [
                'nombre_asociado'  => sprintf("asociado%02d", $i), // Usa %02d para dos dígitos
                'apellido_asociado'=> sprintf("apellido%02d", $i),
                'image_url'        => "url/uirl$i",
                'fecha_alta'       => $currentTimestamp,
                'fecha_baja'       => $currentTimestamp,
                'numero_asociado'  => 2400 + $i,
                'cuit_asociado'    => 20349094399 + $i,
                'fecha_nacimiento' => $currentTimestamp->copy()->subYears(20 + $i),
                'activo'           => 1,
                'estado_civil_id'  => 1,
                'direccion_id'     => $i,
                'documentacion_id' => $i,
                'telefono_id'      => $i,
                'created_at'       => $currentTimestamp,
                'updated_at'       => $currentTimestamp,
            ];
        })->toArray();

        DB::table('asociados')->insert($asociados);
    }
}
