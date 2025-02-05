// src/redux/thunks/direccionThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setDirecciones,
  addDireccion,
  updateDireccionEnStore,
  removeDireccion,
} from "../slices/DireccionSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";

// Thunk para obtener todas las direcciones
export const getDirecciones = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/direcciones/");
      dispatch(setDirecciones(data.direcciones));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al obtener direcciones",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para crear una nueva dirección
export const createDireccion = (direccionData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post("/api/direcciones/", direccionData);
      dispatch(addDireccion(data.direccion));
      Swal.fire({
        icon: "success",
        title: "Dirección creada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/direcciones");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al crear dirección",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para actualizar una dirección existente
export const updateDireccion = (id, direccionData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/direcciones/${id}/`, direccionData);
      dispatch(updateDireccionEnStore(data.direccion));
      Swal.fire({
        icon: "success",
        title: "Dirección actualizada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/direcciones");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al actualizar dirección",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para eliminar una dirección
export const deleteDireccion = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/direcciones/${id}/`);
      dispatch(removeDireccion(id));
      Swal.fire({
        icon: "success",
        title: "Dirección eliminada con éxito",
        showConfirmButton: true,
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al eliminar dirección",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
