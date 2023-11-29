<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CondicionIvaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('condicion_iva')->insert([
            'nombre_condicion_iva' => 'monotributista',
            'valor_iva' => 0,

            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('condicion_iva')->insert([
            'nombre_condicion_iva' => 'responsable inscripto',
            'valor_iva' => 21,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

    }
}
