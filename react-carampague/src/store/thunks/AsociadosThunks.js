import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import {
  addAsociado,
  setAsociados,
  setSelectedAsociado,
  updateAsociadoEnStore,
} from "../slices/AsociadosSlice";
import { addDocumentacion } from "../slices/DocumentacionSlice";

export const getAsociados = () => {
  return async (dispatch) => {
    try {
      const { data } = await carampagueApi.get(`/api/asociados/`);
      console.log(data)
      dispatch(setAsociados(data.asociados));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener asociados",
      });
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
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

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
      const { data: response } = await carampagueApi.post(
        `/api/asociados/`,
        data
      );
      dispatch(addAsociado(response.asociado));
      dispatch(addDocumentacion(response.documentacion))
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente creado con exito",
        showConfirmButton: true,
      });
      navigate("/asociados");
    } catch (error) {
      console.log(error)

      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );
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
      const { data: response } = await carampagueApi.put(
        `/api/asociados/${id}`,
        data
      );
      dispatch(updateAsociadoEnStore(response.asociado));

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asociado actualizado con exito",
        showConfirmButton: true,
      });
      navigate("/asociados");
    } catch (error) {
      console.log(error)
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

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
        dispatch(updateAsociadoEnStore(updatedAsociado));
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
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

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

;




