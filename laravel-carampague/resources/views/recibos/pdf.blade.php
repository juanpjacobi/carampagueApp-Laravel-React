<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Recibo #{{ $recibo->id }}</title>
    <style>
      body {
        font-family: sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      table, th, td {
        border: 1px solid #ccc;
      }
      th, td {
        padding: 8px;
        text-align: left;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Recibo de Pago</h1>
      <p><strong>Recibo:</strong> #{{ $recibo->id }}</p>
      <p><strong>Asociado:</strong> {{ $recibo->asociado->nombre_asociado }} {{ $recibo->asociado->apellido_asociado }}</p>
      <p><strong>Periodo:</strong> {{ $recibo->periodo }}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Horas</th>
          <th>Valor por Hora</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($recibo->lineas as $linea)
          <tr>
            <td>{{ $linea->descripcion }}</td>
            <td>{{ $linea->horas }}</td>
            <td>${{ number_format($linea->valor_hora, 2) }}</td>
            <td>${{ number_format($linea->subtotal, 2) }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>

    <p style="text-align: right; margin-top: 20px; font-size: 1.2em;">
      <strong>Total:</strong> ${{ number_format($recibo->total, 2) }}
    </p>
  </body>
</html>
