import { toggleValidado } from "../../../react-carampague/src/functions/Servicios/lineas/lineas";

export const useLineaValidation = (linea, dispatch) => {
  const handleToggleValidado = async (nuevaValidez, opciones = {}) => {
    try {
      await toggleValidado(linea.id, nuevaValidez, opciones, dispatch);
    } catch (error) {
      console.error("Error en toggleValidado:", error);
    }
  };

  return { handleToggleValidado };
};
