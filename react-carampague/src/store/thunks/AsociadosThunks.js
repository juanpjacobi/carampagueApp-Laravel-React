import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import {
  addNewAsociado,
  setAsociados,
  setSelectedAsociado,
  setUpdatedAsociado,
} from "../slices/AsociadosSlice";

export const getAsociados = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/asociados/`);
      dispatch(setAsociados(data.asociados));
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
        footer: "Error al obtener asociado",
      });
    }
  };
};

export const createAsociado = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.post(`/api/asociados/`, data);
      dispatch(addNewAsociado());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente creado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/asociados");
        dispatch(endLoading());
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
    }
  };
};

export const updateAsociado = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.put(`/api/asociados/${id}`, data);
      dispatch(setUpdatedAsociado());
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
    }
  };
};
