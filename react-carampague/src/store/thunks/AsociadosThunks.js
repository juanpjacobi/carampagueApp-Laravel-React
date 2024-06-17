import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import { setAsociados, setSelectedAsociado } from "../slices/AsociadosSlice";

export const getAsociados = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/asociados/`);
      dispatch(setAsociados(data.asociados));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener asociados",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getAsociado = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/asociados/${id}`);
      dispatch(setSelectedAsociado(data.asociado));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener asociado",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createAsociado = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await carampagueApi.post(`/api/asociados/`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente creado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/asociados");
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
        footer: "Error al crear asociado",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateAsociado = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.put(`/api/asociados/${id}`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asociados actualizado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/asociados");
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
        footer: "Error al actualizar asociado",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const toggleAsociadoActivo = (id, setActivo) => {
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
        const { data } = await carampagueApi.put(`/api/asociados/${id}/toggle`);
        const updatedAsociado = {
          ...data.asociado,
          activo: data.activo ? 1 : 0,
        };
        dispatch(setSelectedAsociado(updatedAsociado));
        setActivo(updatedAsociado.activo);
        dispatch(endLoading());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado del asociado actualizado con éxito",
          showConfirmButton: true,
        });
      } else {
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
        footer: "Error al actualizar el estado del asociado",
      });
    }
  };
};
