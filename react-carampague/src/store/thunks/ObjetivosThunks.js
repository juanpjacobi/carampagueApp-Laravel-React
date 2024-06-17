import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";
import { setObjetivos, setSelectedObjetivo } from "../slices/ObjetivosSlice";
import { startLoading, setError, endLoading } from "../slices/UiSlice";

export const getObjetivos = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/objetivos/`);
      dispatch(setObjetivos(data.objetivos));
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getObjetivo = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/objetivos/${id}`);
      dispatch(setSelectedObjetivo(data.objetivo));
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createObjetivo = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.post(`/api/objetivos/`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Objetivo creado con exito",
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
        footer: "Error al crear objetivo",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateObjetivo = (id, data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await carampagueApi.put(`/api/objetivos/${id}`, data);
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const toggleObjetivoActivo = (id, setActivo) => {
  return async (dispatch) => {
    // dispatch(startLoading());
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
          activo: data.activo ? 1 : 0, // Convertir true/false a 1/0
        };
        dispatch(setSelectedObjetivo(updatedObjetivo)); // Aquí pasas el asociado actualizado
        setActivo(updatedObjetivo.activo); // Actualiza el estado local
        dispatch(endLoading());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado del objetivo actualizado con éxito",
          showConfirmButton: true,
        });
      } else {
        // dispatch(endLoading());
      }
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
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
