import { useState } from "react";
import { normalizarHora } from "../components/utilities/hora-formatter/horaFormatter";
import { actualizarHoras } from "../store/thunks/LineasServiciosThunks";

export const useHorasReales = (linea, dispatch) => {
  const toHHMM = (timeStr) => {
    if (!timeStr) return "";
    const [hh, mm] = timeStr.split(":");
    return hh && mm ? `${hh}:${mm}` : timeStr;
  };

  const [horaRealInicio, setHoraRealInicio] = useState(
    toHHMM(linea.hora_real_inicio ?? "")
  );
  const [horaRealFin, setHoraRealFin] = useState(
    toHHMM(linea.hora_real_fin ?? "")
  );

  

  const isHoraMenor = () => {
    if (!linea.hora_inicio || !horaRealInicio) return false;
    const minutosPlan = normalizarHora(linea.hora_inicio.slice(0, 5));
    const minutosReal = normalizarHora(horaRealInicio);
    return minutosReal < minutosPlan;
  };

  const handleActualizarHoras = async (nuevaHoraInicio, nuevaHoraFin) => {
    const data = {
      hora_real_inicio: nuevaHoraInicio || null,
      hora_real_fin: nuevaHoraFin || null,
    };
    await dispatch(actualizarHoras(data, linea.id));
  };

  const handleHoraInicioChange = (nuevaHora) => {
    setHoraRealInicio(nuevaHora);
    handleActualizarHoras(nuevaHora, horaRealFin);
  };

  const handleHoraFinChange = (nuevaHora) => {
    setHoraRealFin(nuevaHora);
    handleActualizarHoras(horaRealInicio, nuevaHora);
  };

  return {
    horaRealInicio,
    setHoraRealInicio,
    horaRealFin,
    setHoraRealFin,
    handleHoraInicioChange,
    handleHoraFinChange,
    isHoraMenor
  };
};
