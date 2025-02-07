import { toggleValidado } from "../store/thunks/LineasServiciosThunks";

export const useValidacionLinea = (linea, dispatch) => {
  const handleToggleValidado = async (nuevaValidez, opciones = {}) => {
    try {

      await dispatch(toggleValidado(
        linea.id,
        nuevaValidez,
        {
          ...opciones,
        },
        dispatch
      ));
    } catch (error) {
      console.error("Error en handleToggleValidado:", error);
    }
  };

  return { handleToggleValidado };
};
