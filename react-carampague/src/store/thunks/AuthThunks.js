// src/store/thunks/authThunks.js

import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { setUser, setToken, clearAuth } from "../slices/AuthSlice";
import { endLoading, setError, startLoading } from "../slices/UiSlice";

// Thunk para obtener la información del usuario autenticado
export const getUser = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get("/api/user");
      dispatch(setUser(data));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al obtener usuario",
        text: errors.join(", "),
        footer: "Revise su autenticación",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};


export const login = (credentials) => {
    return async (dispatch) => {
      dispatch(startLoading());
      try {
        const { data } = await carampagueApi.post("/api/login", credentials);
        dispatch(setToken(data.token));
        dispatch(setUser(data.user)); 
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sesión iniciada correctamente",
          showConfirmButton: true,
        });
        // dispatch(getUser());
        return data;
      } catch (error) {
        const errors = Object.values(error.response.data.errors).map((err) => err);
        dispatch(setError(errors));
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: errors.join(", "),
          footer: "Revise sus credenciales",
        });
        throw error;
      } finally {
        dispatch(endLoading());
      }
    };
  };
  

// Thunk para cerrar sesión
export const logout = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await carampagueApi.post("/api/logout");
      dispatch(clearAuth());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sesión cerrada correctamente",
        showConfirmButton: true,
      });
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map((err) => err);
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: errors.join(", "),
        footer: "Intente nuevamente",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};
