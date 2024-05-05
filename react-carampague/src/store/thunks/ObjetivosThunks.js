import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";
import { setObjetivos, setSelectedObjetivo, addNewObjetivo, setUpdatedObjetivo } from "../slices/ObjetivosSlice";
import { startLoading, setError, endLoading } from "../slices/UiSlice";

export const getObjetivos = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/objetivos/`);
      dispatch(setObjetivos(data.objetivos));
      dispatch(endLoading());
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
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

export const getObjetivo =  (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const {data} = await carampagueApi.get(`/api/objetivos/${id}`);
      dispatch(setSelectedObjetivo(data.objetivo));
      dispatch(endLoading())
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener objetivo",
      });
    }
  };
};

export const createObjetivo = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.post(`/api/objetivos/`, data);
      dispatch(addNewObjetivo());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Objetivo creado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/objetivos");
      dispatch(endLoading())

      });
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors,
        footer: "Error al crear objetivo",
      });
    }
  };
};

export const updateObjetivo = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.put(`/api/objetivos/${id}`, data);
      dispatch(setUpdatedObjetivo());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Objetivo actualizado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/objetivos");
      });
    } catch (error) {
        const errors = Object.values(error.response.data.errors).map((err) => {
          return err;
        });
        dispatch(setError(errors));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errors,
          footer: "Error al actualizar objetivo",
        });
      }
  };
};

