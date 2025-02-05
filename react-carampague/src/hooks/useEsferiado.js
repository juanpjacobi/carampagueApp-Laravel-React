import { useMemo } from "react";


export const useEsFeriado = (feriados, fechaLinea) => {
  return useMemo(() => {
    return feriados.some((feriado) => feriado.fecha === fechaLinea);
  }, [feriados, fechaLinea]);
};