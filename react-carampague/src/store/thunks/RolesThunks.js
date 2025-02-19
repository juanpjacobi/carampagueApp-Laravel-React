import carampagueApi from "../../api/carampagueApi";
import { addRol, removeRol, setRoles, updateRolEnStore } from "../slices/RolesSlice";
import Swal from "sweetalert2";
import { startLoading, endLoading, setError } from "../slices/UiSlice";

// GET: Obtener todos los usuarios
export const getRoles = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await carampagueApi.get("/api/roles");
    dispatch(setRoles(data.roles));
  } catch (error) {
    console.error("Error fetching roles:", error);
    dispatch(setError(["Error fetching roles"]));
  } finally {
    dispatch(endLoading());
  }
};

// POST: Crear un nuevo usuario
export const createRol = (rolData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await carampagueApi.post("/api/roles", rolData);
    dispatch(addRol(data.rol));
    Swal.fire({
      icon: "success",
      title: "Rol creado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return data.rol;
  } catch (error) {
    console.error("Error creating rol:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el rol",
    });
    throw error;
  } finally {
    dispatch(endLoading());
  }
};

export const updateRol = (rolId, data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.put(`/api/roles/${rolId}`, data);
      dispatch(updateRolEnStore(response.rol));
      Swal.fire({
        icon: "success",
        title: "Rol actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.rol;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al actualizar rol"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
      throw error;
    } finally {
      dispatch(endLoading());
    }
  };

// DELETE: Eliminar un rol
export const deleteRol = (rolId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await carampagueApi.delete(`/api/roles/${rolId}`);
    dispatch(removeRol(rolId));
    Swal.fire({
      icon: "success",
      title: "Rol eliminado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error deleting rol:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el rol",
    });
  } finally {
    dispatch(endLoading());
  }
};
