import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import { addClienteEnStore, setClientes, updateClienteEnStore } from "../slices/ClientesSlice";


export const getClientes = () => {
  return async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/clientes/");
      dispatch(setClientes(data));
    } catch (error) {
      console.log("Error completo:", error);

      const errors = Object.values(error.response.data.errors).map((err) => err);
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

export const getCliente = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/clientes/${id}`);
    } catch (error) {
      console.log("Error completo:", error);

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

      const {data: response} = await carampagueApi.post(`/api/clientes/`, data);
      dispatch(addClienteEnStore(response.cliente)); // Agregamos el cliente al store
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente creado con exito",
        showConfirmButton: true,
      })
      navigate("/clientes");
    } catch (error) {
      const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors).map((err) => err)
      : ["Ocurrió un error inesperado."];
      console.error("Error completo:", error);

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

export const updateCliente = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { data: response } = await carampagueApi.put(`/api/clientes/${id}`, data);


      dispatch(updateClienteEnStore(response.cliente)); 

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente actualizado con éxito",
        showConfirmButton: true,
      })
      navigate("/clientes");
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
      footer: "Error al actualizar cliente",
    });
    } finally {
      dispatch(endLoading());
    }
  };
};
export const toggleClienteActivo = (id, setActivo) => {
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
        const { data } = await carampagueApi.put(`/api/clientes/${id}/toggle`);
        const updatedCliente = {
          ...data.cliente,
          activo: data.activo ? 1 : 0, 
        };
        dispatch(updateClienteEnStore(updatedCliente)); 
        setActivo(updatedCliente.activo); 
        dispatch(endLoading());

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado del cliente actualizado con éxito",
          showConfirmButton: true,
        });
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
