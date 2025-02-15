<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Factura #{{ $factura->id }}</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .info {
        margin-bottom: 10px;
      }
      .info strong {
        display: inline-block;
        width: 150px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      table, th, td {
        border: 1px solid #ccc;
      }
      th, td {
        padding: 8px;
        text-align: left;
      }
      .total {
        text-align: right;
        margin-top: 20px;
        font-size: 1.2em;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Factura</h1>
      <p>Factura #{{ $factura->id }}</p>
    </div>
    <div class="info">
      <p>
        <strong>Cliente:</strong>
        @if($factura->cliente)
          {{ $factura->cliente->razon_social }}
        @else
          Sin Datos
        @endif
      </p>
      <p>
        <strong>Objetivo:</strong>
        @if($factura->objetivo)
          {{ $factura->objetivo->nombre_objetivo }}
        @else
          Sin Datos
        @endif
      </p>
      <p><strong>Periodo:</strong> {{ $factura->periodo }}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Horas</th>
          <th>Valor Hora</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        @foreach($factura->lineas as $linea)
          <tr>
            <td>{{ $linea->descripcion }}</td>
            <td>{{ $linea->horas }}</td>
            <td>${{ number_format($linea->valor_hora, 2) }}</td>
            <td>${{ number_format($linea->subtotal, 2) }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>
    <div class="total">
      Total: ${{ number_format($factura->total, 2) }}
    </div>
  </body>
</html>
