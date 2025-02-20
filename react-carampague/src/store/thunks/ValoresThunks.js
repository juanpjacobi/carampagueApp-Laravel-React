
import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import { addValor, setValores, updateValorEnStore } from "../slices/ValoresSlice";


export const getValores = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.get("/api/valores/");

      dispatch(setValores(data.valores));

    } catch (error) {
      console.log("Error completo:", error); 

      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors).map((err) => err)
        : ["Ocurrió un error inesperado."];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al obtener valores",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

/**
 * Thunk para crear un nuevo valor.
 */
export const createValor = (valorData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.post('/api/valores', valorData);

      dispatch(addValor(data.valor));

      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Valor creado correctamente.",
      });
      navigate(-1)

    } catch (error) {
      // Si existe error.response.data.message, usarlo; si no, buscar en errors.
      const errors = error.response?.data?.message 
        ? [error.response.data.message]
        : error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat()
          : ["Ocurrió un error inesperado."];
      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al crear el valor",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

/**
 * Thunk para actualizar un valor existente.
 */
export const updateValor = (id, valorData, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await carampagueApi.put(`/api/valores/${id}`, valorData);
      console.log(data)

      // Actualizar el valor en el store
      dispatch(updateValorEnStore(data.valor));

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Valor actualizado correctamente.",
      });
      navigate("/clientes");

    } catch (error) {
      console.log("Error completo:", error); // Log para inspeccionar el error

      const errors = error?.response?.data?.errors
        ? Object.values(error.response.data.errors).map((err) => err)
        : ["Ocurrió un error inesperado."]; // Mensaje genérico en caso de error desconocido
      
      dispatch(setError(errors));
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.join(", "),
        footer: "Error al actualizar el valor",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

