// src/redux/thunks/documentacionThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { setDocumentacion, addDocumentacion, updateDocumentacionEnStore, removeDocumentacion } from "../slices/DocumentacionSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";


export const getDocumentaciones = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/documentaciones`);
      dispatch(setDocumentacion(data.documentaciones));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getDocumentacionByAsociado = (asociadoId) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/asociados/${asociadoId}/documentacion`);
      dispatch(setDocumentacion(data.documentacion));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createDocumentacion = (documentacionData, asociadoId, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post(`/api/documentaciones`, documentacionData);
      dispatch(addDocumentacion(data.documentacion));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Documentación creada correctamente.",
      });
      navigate(`/asociados/${asociadoId}/documentacion/${data.documentacion.id}`);
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al crear documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateDocumentacion = (documentacionId, documentacionData, asociadoId, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/documentaciones/${documentacionId}`, documentacionData);
      dispatch(updateDocumentacionEnStore(data.documentacion));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Documentación actualizada correctamente.",
      });
      navigate(`/asociados/${asociadoId}/documentacion/${documentacionId}`);
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al actualizar documentación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
