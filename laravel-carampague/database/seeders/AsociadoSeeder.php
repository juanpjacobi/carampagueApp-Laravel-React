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
    public function run(): void
    {
        {
            DB::table('asociados')->insert([
                'nombre_asociado' => 'gonzalo',
                'apellido_asociado' => 'althabe',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 2454,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 1,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);
            DB::table('asociados')->insert([
                'nombre_asociado' => 'gabriel',
                'apellido_asociado' => 'marino',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 1254,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 2,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);
            DB::table('asociados')->insert([
                'nombre_asociado' => 'cristian',
                'apellido_asociado' => 'ligorria',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 1354,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 2,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);
            DB::table('asociados')->insert([
                'nombre_asociado' => 'juan pablo',
                'apellido_asociado' => 'jacobi',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 2525,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 2,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);
            DB::table('asociados')->insert([
                'nombre_asociado' => 'ivan',
                'apellido_asociado' => 'caules',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 1111,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 2,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);
            DB::table('asociados')->insert([
                'nombre_asociado' => 'martin',
                'apellido_asociado' => 'luter king',
                'image_url' => 'url/uirl',

                'fecha_alta' => Carbon::now(),
                'fecha_baja' => Carbon::now(),
                'numero_asociado' => 1354,
                'cuit_asociado' => 20349094399,
                'fecha_nacimiento' => Carbon::now(),
                'activo' => 1,
                'estado_civil_id' => 2,
                'direccion_id' => 1,
                'documentacion_id' => 1,
                'telefono_id' => 1
            ]);


        }
    }
}
