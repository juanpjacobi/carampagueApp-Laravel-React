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
        // $this->call(UserSeeder::class);
        // $this->call(CondicionIvaSeeder::class);

        // $this->call(ProvinciaSeeder::class);
        // $this->call(LocalidadSeeder::class);

        // $this->call(TipoTelefonoSeeder::class);
        // // $this->call(ValorSeeder::class);
        // $this->call(EstadoCivilSeeder::class);
        // $this->call(TallesSeeder::class);
        // $this->call(TipoPrendaSeeder::class);
        // $this->call(EstadoDocumentacionSeeder::class);

        // $this->call(TipoDocumentacionSeeder::class);
        // $this->call(PrendasSeeder::class);
        // $this->call(BarriosSeeder::class);
        // $this->call(FeriadoSeeder::class);
        // $this->call(TiposMotivosSeeder::class);
        // $this->call(TipoAjusteSeeder::class);


        $this->call(AsociadoSeeder::class);

    }
}
