
import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setBarrios,
  addBarrio,
  updateBarrioEnStore,
  removeBarrio,
} from "../slices/BarrioSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";

// Thunk para obtener todos los barrios
export const getBarrios = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/barrios/");
      dispatch(setBarrios(data.barrios));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al obtener barrios",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para crear un nuevo barrio
export const createBarrio = (barrioData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post("/api/barrios/", barrioData);
      dispatch(addBarrio(data.barrio));
      Swal.fire({
        icon: "success",
        title: "Barrio creado con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/barrios");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al crear barrio",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para actualizar un barrio existente
export const updateBarrio = (id, barrioData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/barrios/${id}/`, barrioData);
      dispatch(updateBarrioEnStore(data.barrio));
      Swal.fire({
        icon: "success",
        title: "Barrio actualizado con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/barrios");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al actualizar barrio",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para eliminar un barrio
export const deleteBarrio = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/barrios/${id}/`);
      dispatch(removeBarrio(id));
      Swal.fire({
        icon: "success",
        title: "Barrio eliminado con éxito",
        showConfirmButton: true,
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al eliminar barrio",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
