import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";
import {
  addObjetivoEnStore,
  setObjetivos,
  updateObjetivoEnStore,
} from "../slices/ObjetivosSlice";
import { startLoading, setError, endLoading } from "../slices/UiSlice";

export const getObjetivos = () => {
  return async (dispatch) => {
    try {
      const { data } = await carampagueApi.get(`/api/objetivos/`);

      dispatch(setObjetivos(data));
    } catch (error) {
      console.log(error);
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener objetivos",
      });
    }
  };
};

export const getObjetivo = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/objetivos/${id}`);
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener objetivo",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createObjetivo = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { data: response } = await carampagueApi.post(
        `/api/objetivos/`,
        data
      );
      dispatch(addObjetivoEnStore(response.objetivo));
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Objetivo creado con exito",
        showConfirmButton: true,
      });
      navigate("/objetivos");
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors,
        footer: "Error al crear objetivo",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateObjetivo = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.put(
        `/api/objetivos/${id}`,
        data
      );

      dispatch(updateObjetivoEnStore(response.objetivo));

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Objetivo actualizado con exito",
        showConfirmButton: true,
      });
      navigate("/objetivos");
    } catch (error) {
      console.log("Error completo:", error);

      const errors = error?.response?.data?.errors
        ? Object.values(error.response.data.errors).map((err) => err)
        : ["Ocurrió un error inesperado."];

      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al actualizar objetivo",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const toggleObjetivoActivo = (id, setActivo) => {
  return async (dispatch) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cambiar estado!",
      });

      if (result.isConfirmed) {
        const { data } = await carampagueApi.put(`/api/objetivos/${id}/toggle`);
        const updatedObjetivo = {
          ...data.objetivo,
          activo: data.activo ? 1 : 0,
        };
        dispatch(updateObjetivoEnStore(updatedObjetivo));
        setActivo(updatedObjetivo.activo);
        dispatch(endLoading());

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado del objetivo actualizado con éxito",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors,
        footer: "Error al actualizar el estado del objetivo",
      });
      dispatch(endLoading());
    }
  };
};
