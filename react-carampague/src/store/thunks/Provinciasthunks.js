
import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setProvincias,
  addProvincia,
  updateProvinciaEnStore,
  removeProvincia,
} from "../slices/ProvinciaSlice";
import { setError, startLoading, endLoading } from "../slices/UiSlice";

// Thunk para obtener todas las provincias
export const getProvincias = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/provincias/");
      dispatch(setProvincias(data.provincias));
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al obtener provincias",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para crear una nueva provincia
export const createProvincia = (provinciaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post("/api/provincias/", provinciaData);
      dispatch(addProvincia(data.provincia));
      Swal.fire({
        icon: "success",
        title: "Provincia creada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/provincias");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al crear provincia",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para actualizar una provincia existente
export const updateProvincia = (id, provinciaData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/provincias/${id}/`, provinciaData);
      dispatch(updateProvinciaEnStore(data.provincia));
      Swal.fire({
        icon: "success",
        title: "Provincia actualizada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/provincias");
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al actualizar provincia",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

// Thunk para eliminar una provincia
export const deleteProvincia = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.delete(`/api/provincias/${id}/`);
      dispatch(removeProvincia(id));
      Swal.fire({
        icon: "success",
        title: "Provincia eliminada con éxito",
        showConfirmButton: true,
      });
    } catch (error) {
      const errors = Object.values(error.response?.data?.errors || {}).flat();
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al eliminar provincia",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
