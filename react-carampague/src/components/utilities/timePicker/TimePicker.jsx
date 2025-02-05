import React, { useState, useEffect } from 'react';

export const TimePicker = ({
  value,           
  onChange,        
  horas = 24,      
  minutos = ["00","10","20","30","40","50"], 
  label = "Hora"    
}) => {

  // Estado local que se inicializa solo una vez
  const [horaSeleccionada, setHoraSeleccionada] = useState(value ? parseInt(value.split(':')[0],10) : 0);
  const [minutosSeleccionados, setMinutosSeleccionados] = useState(value ? value.split(':')[1] : "00");

  // Este useEffect se asegura de que solo actualicemos si la hora es realmente distinta
  useEffect(() => {
    const nuevaHora = `${horaSeleccionada.toString().padStart(2, '0')}:${minutosSeleccionados}`;
    if (nuevaHora !== value) {
      onChange(nuevaHora);
    }
  }, [horaSeleccionada, minutosSeleccionados, value]); // Eliminamos `onChange` de las dependencias

  // Cuando la propiedad `value` cambia, actualizamos los selectores locales
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      if (h !== horaSeleccionada.toString().padStart(2, '0') || m !== minutosSeleccionados) {
        setHoraSeleccionada(parseInt(h, 10));
        setMinutosSeleccionados(m);
      }
    }
  }, [value]);

  const horasArray = Array.from({ length: horas }, (_, i) => i);

  return (
    <div className="flex md:flex-col items-center justify-between">
      {label && <span className="md:hidden font-bold mb-1">{label}</span>}
      <div className="flex gap-1">
        <select
          value={horaSeleccionada}
          onChange={(e) => setHoraSeleccionada(parseInt(e.target.value, 10))}
          className="border p-1 rounded"
        >
          {horasArray.map(h => (
            <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
          ))}
        </select>
        <span>:</span>
        <select
          value={minutosSeleccionados}
          onChange={(e) => setMinutosSeleccionados(e.target.value)}
          className="border p-1 rounded"
        >
          {minutos.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
