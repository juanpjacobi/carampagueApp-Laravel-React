<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoAjuste;

class TipoAjusteSeeder extends Seeder
{
    public function run()
    {
        // Definimos una lista de tipos de ajuste con su concepto, bandera 'add' y monto por defecto.
        $tiposAjuste = [
            [
                'concepto' => 'Anticipo',
                'add'      => false, // Se resta
                'monto'    => 100.00, // Ejemplo de monto
            ],
            [
                'concepto' => 'Monotributo',
                'add'      => false, // Se resta
                'monto'    => 150.00,
            ],
            [
                'concepto' => 'Estudios Médicos',
                'add'      => false, // Se resta (en cuotas, por ejemplo)
                'monto'    => 50.00,
            ],
            [
                'concepto' => 'Pasajes de Colectivo',
                'add'      => true,  // Se suma
                'monto'    => 75.00,
            ],
            // Puedes agregar más registros según tus necesidades...
        ];

        foreach ($tiposAjuste as $tipo) {
            TipoAjuste::create($tipo);
        }
    }
}
