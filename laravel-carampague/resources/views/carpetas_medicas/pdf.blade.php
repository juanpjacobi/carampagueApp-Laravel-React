<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Carpeta Médica #{{ $carpeta->id }}</title>
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
      .content {
        margin-top: 20px;
      }
      .info {
        margin-bottom: 10px;
      }
      .info strong {
        display: inline-block;
        width: 150px;
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
      <h1>Carpeta Médica</h1>
      <p>Carpeta Médica #{{ $carpeta->id }}</p>
    </div>

    <div class="content">
      <div class="info">
        <strong>Asociado:</strong>
        @if($carpeta->asociado)
          {{ $carpeta->asociado->nombre_asociado }} {{ $carpeta->asociado->apellido_asociado }}
        @else
          Sin Datos
        @endif
      </div>
      <div class="info">
        <strong>Periodo:</strong> {{ $carpeta->periodo }}
      </div>
      <div class="info">
        <strong>Monto:</strong> ${{ number_format($carpeta->monto, 2) }}
      </div>
    </div>

    <div class="total">
      Total: ${{ number_format($carpeta->monto, 2) }}
    </div>
  </body>
</html>
