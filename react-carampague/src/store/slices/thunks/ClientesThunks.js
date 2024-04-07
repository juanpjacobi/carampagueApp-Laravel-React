import carampagueApi from "../../../api/carampagueApi";

import Swal from "sweetalert2";
import {
  addNewCliente,
  setClientes,
  setError,
  setSelectedCliente,
  setUpdateCliente,
  startLoading,
} from "../clientes/ClientesSlice";

export const getClientes = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const {data} = await carampagueApi.get(`/api/clientes/`);
      dispatch(setClientes(data.clientes));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener clientes",
      });
    }
  };
};

export const getCliente =  (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const {data} = await carampagueApi.get(`/api/clientes/${id}`);
      dispatch(setSelectedCliente(data.cliente));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => {
        return err;
      });
      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener cliente",
      });
    }
  };
};

export const createCliente = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.post(`/api/clientes/`, data);
      dispatch(addNewCliente());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente creado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/clientes");
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
        footer: "Error al crear cliente",
      });
    }
  };
};

export const updateCliente = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.put(`/api/clientes/${id}`, data);
      dispatch(setUpdateCliente());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente actualizado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/clientes");
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
          footer: "Error al actualizar cliente",
        });
      }
  };
};
