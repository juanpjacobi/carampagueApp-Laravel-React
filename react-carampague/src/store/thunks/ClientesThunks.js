import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import { setClientes, setSelectedCliente } from "../slices/ClientesSlice";

export const getClientes = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/clientes/`);
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const getCliente = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/clientes/${id}`);
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createCliente = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.post(`/api/clientes/`, data);
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
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateCliente = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await carampagueApi.put(`/api/clientes/${id}`, data);
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
    } finally {
      dispatch(endLoading());
    }
  };
};
export const toggleClienteActivo = (id, setActivo) => {
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
        const { data } = await carampagueApi.put(`/api/clientes/${id}/toggle`);
        const updatedCliente = {
          ...data.cliente,
          activo: data.activo ? 1 : 0, // Convertir true/false a 1/0
        };
        dispatch(setSelectedCliente(updatedCliente)); // Aquí pasas el asociado actualizado
        setActivo(updatedCliente.activo); // Actualiza el estado local
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado del cliente actualizado con éxito",
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
        footer: "Error al actualizar el estado del cliente",
      });
    }
  };
};
