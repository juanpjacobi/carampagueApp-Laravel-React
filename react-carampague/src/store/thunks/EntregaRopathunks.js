// src/redux/thunks/entregaRopaThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { setEntregaRopa, addEntregaRopa, updateEntregaRopaEnStore } from "../slices/EntregaRopaSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";
import {  setLineasEntregaRopa } from "../slices/LineasEntregaRopaSlice";



export const getEntregasRopa = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/entrega-ropa`);
      dispatch(setEntregaRopa(data.entregas_ropa));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener entregas de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const fetchEntregaRopaDetail = (entregaRopaId) => {
  return async (dispatch, getState) => {
    const existingDetail = getState().entregaRopaDetails.entregaRopaDetails[entregaRopaId];
    if (existingDetail) {
      return;
    }
    try {
      dispatch(startLoading());
      const response = await carampagueApi.get(`/api/entregas-ropa/${entregaRopaId}`);
      dispatch(setEntregaRopaDetail(response.data)); // Asumiendo que la respuesta contiene el objeto de entrega
    } catch (error) {
      console.error(`Error fetching entrega de ropa con ID ${entregaRopaId}:`, error);
      dispatch(setError(`Error al obtener la entrega de ropa con ID ${entregaRopaId}`));
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getEntregaRopaByAsociado = (asociadoId) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get(`/api/asociados/${asociadoId}/entrega-ropa`);
      dispatch(setEntregaRopa(data.entregaRopa));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener entregas de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getLineasPorEntrega = (entregaId) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/entrega-ropa/detalle/${entregaId}`);
      dispatch(setLineasEntregaRopa(data.lineas));
    } catch (error) {
      console.log(error)

      const errors = error.response?.data?.errors 
        ? Object.values(error.response.data.errors) 
        : ["Error al obtener las líneas de entrega de ropa"];
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
};

export const createEntregaRopa = (entregaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post(`/api/entrega-ropa`, entregaData);
      
      dispatch(addEntregaRopa(data.entregaRopa));
      if (data.entregaRopa.id) {
        dispatch(getLineasPorEntrega(data.entregaRopa.id));
        console.log(data.entregaRopa.id)
      }
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Entrega de ropa creada correctamente.",
      });
      navigate(-1);
    } catch (error) {
      console.log(error)

      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al crear entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateEntregaRopa = (entregaId, entregaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/entrega-ropa/${entregaId}`, entregaData);
      dispatch(updateEntregaRopaEnStore(data.entregaRopa));
      if (data.entregaRopa.id) {
        dispatch(getLineasPorEntrega(data.entregaRopa.id));
        console.log(data.entregaRopa.id)
      }
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Entrega de ropa actualizada correctamente.",
      });
      navigate(-1);
    } catch (error) {
      console.log(error)
      const errors = Object.values(error.response?.data?.errors || {}).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al actualizar entrega de ropa",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
