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
                'concepto' => 'Acciones',
                'add'      => false, // Se resta
                'monto'    => 5000.00, // Ejemplo de monto
            ],
            [
                'concepto' => 'Anticipo',
                'add'      => false, // Se resta
                'monto'    => 100000, // Ejemplo de monto
            ],
            [
                'concepto' => 'Monotributo',
                'add'      => false, // Se resta
                'monto'    => 27800,
            ],
            [
                'concepto' => 'Estudios Médicos',
                'add'      => false, // Se resta (en cuotas, por ejemplo)
                'monto'    => 12500,
            ],
            [
                'concepto' => 'Pasajes de Colectivo',
                'add'      => true,
                'monto'    => 00.00,
            ],
            // Puedes agregar más registros según tus necesidades...
        ];

        foreach ($tiposAjuste as $tipo) {
            TipoAjuste::create($tipo);
        }
    }
}
