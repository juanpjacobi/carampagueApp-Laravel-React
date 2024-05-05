<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ValorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('valores')->insert([
            'valor_vigilador' => 2300,
            'valor_cliente' => 3500,

            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('valores')->insert([
            'valor_vigilador' => 2500,
            'valor_cliente' => 4800,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
