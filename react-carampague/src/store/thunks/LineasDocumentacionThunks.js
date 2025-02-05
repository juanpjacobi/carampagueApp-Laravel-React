// src/redux/thunks/lineasDocumentacionThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setLineasDocumentacion,
  addLineaDocumentacion,
  updateLineaDocumentacionEnStore,
  removeLineaDocumentacion,
} from "../slices/LineasDocumentacionSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";


export const getLineasDocumentacion = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/lineas-documentacion`);
      dispatch(setLineasDocumentacion(data.lineas));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener líneas de documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};


export const getLineasDocumentacionByDocumentacion = (documentacionId) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/documentaciones/${documentacionId}/lineas`);
      dispatch(setLineasDocumentacion(data.lineasDocumentacion));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener líneas de documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createLineaDocumentacion = (data, navigate, documentacionId) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      // Se envía la data junto con el documentacion_id
      const response = await carampagueApi.post("/api/lineas-documentacion", {
        ...data,
        documentacion_id: documentacionId,
      });
      dispatch(addLineaDocumentacion(response.data.linea));
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Línea de documentación creada correctamente.",
      });
      navigate(-1);
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Ocurrió un error inesperado."];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
        footer: "Error al crear la línea de documentación.",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};



export const updateLineaDocumentacion = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await carampagueApi.put(`/api/lineas-documentacion/${id}`, data);
      dispatch(updateLineaDocumentacionEnStore(response.data.linea));
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Línea de documentación actualizada correctamente.",
      });
      navigate(-1);
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Ocurrió un error inesperado."];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
        footer: "Error al actualizar la línea de documentación.",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};


// Thunk para eliminar una línea de documentación
export const deleteLineaDocumentacion = (documentacionId, lineaId) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/documentaciones/${documentacionId}/lineas/${lineaId}`);
      dispatch(removeLineaDocumentacion(lineaId));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de documentación eliminada correctamente.",
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al eliminar línea de documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
