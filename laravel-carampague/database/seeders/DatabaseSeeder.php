<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(RolSeeder::class);
        // $this->call(EstadoSeeder::class);
        // $this->call(UserSeeder::class);
        // $this->call(ProvinciaSeeder::class);
        // $this->call(TipoTelefonoSeeder::class);
        // $this->call(ValorSeeder::class);
        // $this->call(ObjetivoSeeder::class);
        $this->call(EstadoCivilSeeder::class);




    }
}
