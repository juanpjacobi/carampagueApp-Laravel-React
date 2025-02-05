// src/redux/thunks/localidadThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setLocalidades,
  addLocalidad,
  updateLocalidadEnStore,
  removeLocalidad,
} from "../slices/LocalidadSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";

// Thunk para obtener todas las localidades
export const getLocalidades = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/localidades/");
      dispatch(setLocalidades(data.localidades));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al obtener localidades",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para crear una nueva localidad
export const createLocalidad = (localidadData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post("/api/localidades/", localidadData);
      dispatch(addLocalidad(data.localidad));
      Swal.fire({
        icon: "success",
        title: "Localidad creada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/localidades");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al crear localidad",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para actualizar una localidad existente
export const updateLocalidad = (id, localidadData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/localidades/${id}/`, localidadData);
      dispatch(updateLocalidadEnStore(data.localidad));
      Swal.fire({
        icon: "success",
        title: "Localidad actualizada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/localidades");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al actualizar localidad",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para eliminar una localidad
export const deleteLocalidad = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/localidades/${id}/`);
      dispatch(removeLocalidad(id));
      Swal.fire({
        icon: "success",
        title: "Localidad eliminada con éxito",
        showConfirmButton: true,
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al eliminar localidad",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
