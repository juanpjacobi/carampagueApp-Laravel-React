// src/redux/thunks/lineasEntregaRopaThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setLineasEntregaRopa,
  addLineaEntregaRopa,
  updateLineaEntregaRopaEnStore,
  removeLineaEntregaRopa,
} from "../slices/LineasEntregaRopaSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";

// Thunk para obtener todas las líneas de entrega de ropa por entregaRopaId
export const getLineasEntregaRopa = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/lineas-ropa");
      dispatch(setLineasEntregaRopa(data.lineas_entrega_ropa));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener líneas de entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para crear una nueva línea de entrega de ropa
export const createLineaEntregaRopa = (entregaRopaId, lineaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post(`/api/entrega-ropa/${entregaRopaId}/lineas`, lineaData);
      dispatch(addLineaEntregaRopa(data.lineaEntregaRopa));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de entrega de ropa creada correctamente.",
      });
      navigate(`/entrega-ropa/${entregaRopaId}/lineas/${data.lineaEntregaRopa.id}`);
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al crear línea de entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para actualizar una línea de entrega de ropa existente
export const updateLineaEntregaRopa = (entregaRopaId, lineaId, lineaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/entrega-ropa/${entregaRopaId}/lineas/${lineaId}`, lineaData);
      dispatch(updateLineaEntregaRopaEnStore(data.lineaEntregaRopa));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de entrega de ropa actualizada correctamente.",
      });
      navigate(`/entrega-ropa/${entregaRopaId}/lineas/${lineaId}`);
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al actualizar línea de entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para eliminar una línea de entrega de ropa
export const deleteLineaEntregaRopa = (entregaRopaId, lineaId) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/entrega-ropa/${entregaRopaId}/lineas/${lineaId}`);
      dispatch(removeLineaEntregaRopa(lineaId));
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Línea de entrega de ropa eliminada correctamente.",
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
        footer: "Error al eliminar línea de entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
