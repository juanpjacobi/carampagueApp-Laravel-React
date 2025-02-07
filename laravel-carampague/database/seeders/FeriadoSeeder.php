<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feriado;
use Carbon\Carbon;

class FeriadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startDate = Carbon::create(2024, 12, 10);

        for ($i = 1; $i <= 5; $i++) {
            $randomDays = rand(0, 60);
            $feriadoDate = $startDate->copy()->addDays($randomDays);

            Feriado::create([
                'fecha' => $feriadoDate->toDateString(),
                'descripcion' => "Feriado de prueba #$i"
            ]);
        }
    }
}
