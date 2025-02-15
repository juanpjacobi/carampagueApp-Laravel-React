
import carampagueApi from "../../api/carampagueApi";
import { addLineaServicio, removeLineaServicio, setLineasServicio, updateLineaServicioEnStore } from "../slices/LineasServiciosSlice";
import { addMotivo, removeMotivosByLineaId } from "../slices/MotivosSlices";
import { startLoading, setError, endLoading } from "../slices/UiSlice";
import Swal from "sweetalert2";

export const getLineasServicios = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get(`/api/lineas-servicio/`);
    dispatch(setLineasServicio(data.lineasServicio));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener las líneas de servicio"];
    dispatch(setError(errors));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errors.join(", "),
    });
  } finally {
    dispatch(endLoading());
  }
};

export const createLineaServicio = (lineaData, navigate) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.post("/api/lineas-servicio", lineaData);
      dispatch(addLineaServicio(data.linea));
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de servicio creada correctamente.",
      });
      // navigate(-1);
    } catch (error) {
      console.log(error)
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al crear la línea de servicio"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };

  export const updateLineaServicio = (id, lineaData, navigate) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.put(`/api/lineas-servicio/${id}`, lineaData);
      dispatch(updateLineaServicioEnStore(data.linea));
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de servicio actualizada correctamente.",
      });
      // navigate(-1);
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al actualizar la línea de servicio"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };

  export const asignarAsociado = (data, idLinea) => {
    return async (dispatch) => {
      try {
        const response = await carampagueApi.put(`/api/lineas-servicio/${idLinea}/asignar-asociado`, data);
        const { linea } = response.data; // Se asume que la respuesta viene en { linea: { ... } }
        dispatch(updateLineaServicioEnStore(linea));
      } catch (error) {
        console.error("Error al asignar asociado:", error);
        throw error;
      }
    };
  };

  export const actualizarHoras = (data, id) => {
    return async (dispatch) => {
      dispatch(startLoading());
      try {
        const response = await carampagueApi.put(`/api/lineas-servicio/${id}/actualizar-horas`, data);
        const { linea } = response.data; // Se asume que la respuesta contiene { linea: { ... } }
        dispatch(updateLineaServicioEnStore(linea));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar horas",
        });
      } finally {
        dispatch(endLoading());
      }
    };
  };

  export const toggleValidado = (lineaId, isValidado, options = {}) => {
    return async (dispatch) => {
      dispatch(startLoading());
      try {
        const payload = { is_validado: isValidado };
        if (options.crear_linea_real) payload.crear_linea_real = true;
        if (options.revertir) payload.revertir = true;
        if (options.tipo_motivo_id) payload.tipo_motivo_id = options.tipo_motivo_id;
        if (options.observaciones) payload.observaciones = options.observaciones;
  
        const response = await carampagueApi.put(`/api/lineas-servicio/${lineaId}/toggle-validado`, payload);
        const { linea, nueva_linea, message, motivo } = response.data;
        
        // Actualizamos la línea existente en el store
        dispatch(updateLineaServicioEnStore(linea));
  
        // Si se creó una nueva línea (por ejemplo, para las horas reales), la agregamos
        if (nueva_linea) {
          dispatch(addLineaServicio(nueva_linea));
        }
        if (options.revertir) {
          dispatch(removeMotivosByLineaId(lineaId));
        } else if (motivo) {
          // En otro caso, si se creó o actualizó un motivo, lo actualizamos en el store
          dispatch(addMotivo(motivo));
        }
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: message || "Cambios guardados",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error al togglear validado:", error);
        const msg = error?.response?.data?.message || "No se pudo actualizar la línea";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
        });
      } finally {
        dispatch(endLoading());
      }
    };
  };

  export const eliminarLineaServicio = (id) => {
  return async (dispatch) => {
    try {
      await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la linea",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          carampagueApi.delete(`/api/lineas-servicio/${id}`);         
           dispatch(removeLineaServicio(id));
        }
      });


    } catch (error) {
      console.error("Error eliminando la línea de servicio:", error);
      throw error;
    }
  };
};

export const toggleJustificado = (lineaId, isJustificado) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.put(
      `/api/lineas-servicio/${lineaId}/toggle-justificado`,
      { is_justificado: isJustificado }
    );
    // Actualizamos la línea en el store con la respuesta
    dispatch(updateLineaServicioEnStore(data.linea));
    await Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Justificación actualizada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al actualizar la justificación"];
    dispatch(setError(errors));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors.join(", "),
    });
  } finally {
    dispatch(endLoading());
  }
};
