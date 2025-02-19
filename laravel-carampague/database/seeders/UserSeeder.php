<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'nombre_usuario' => 'user1',
            'password' => bcrypt(12345678),
            'activo' => 1,
            'rol_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'nombre_usuario' => 'user2',
            'password' => bcrypt(12345678),
            'activo' => 1,
            'rol_id' => 2,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'nombre_usuario' => 'user3',
            'password' => bcrypt(12345678),
            'activo' => 0,
            'rol_id' => 3,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'nombre_usuario' => 'user4',
            'password' => bcrypt(12345678),
            'activo' => 0,
            'rol_id' => 3,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
