<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrendasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prendas')->insert([
            'stock' => 2,
            'tipo_prenda_id' => 1,
            'talle_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 5,
            'tipo_prenda_id' => 1,
            'talle_id' => 2,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 4,
            'tipo_prenda_id' => 2,
            'talle_id' => 3,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 4,
            'tipo_prenda_id' => 2,
            'talle_id' => 4,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 10,
            'tipo_prenda_id' => 3,
            'talle_id' => 5,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 5,
            'tipo_prenda_id' => 4,
            'talle_id' => 6,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 2,
            'tipo_prenda_id' => 4,
            'talle_id' => 7,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('prendas')->insert([
            'stock' => 4,
            'tipo_prenda_id' => 4,
            'talle_id' => 8,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
