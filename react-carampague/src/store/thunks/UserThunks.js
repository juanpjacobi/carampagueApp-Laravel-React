import carampagueApi from "../../api/carampagueApi";
import { setUsers, addUser, updateUserInStore, removeUser } from "../slices/UserSlice";
import Swal from "sweetalert2";
import { startLoading, endLoading, setError } from "../slices/UiSlice";

// GET: Obtener todos los usuarios
export const getUsers = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await carampagueApi.get("/api/users");
    dispatch(setUsers(data.users));
  } catch (error) {
    console.error("Error fetching users:", error);
    dispatch(setError(["Error fetching users"]));
  } finally {
    dispatch(endLoading());
  }
};

// POST: Crear un nuevo usuario
export const createUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await carampagueApi.post("/api/users", userData);
    dispatch(addUser(data.user));
    await Swal.fire({
      icon: "success",
      title: "Usuario creado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(-1)
    return data.user;
  } catch (error) {
    console.error("Error creating user:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el usuario",
    });
    throw error;
  } finally {
    dispatch(endLoading());
  }
};

// PUT: Actualizar el campo 'activo' de un usuario
export const updateUserActive = (userId, activo) => async (dispatch) => {
  try {
    const { data } = await carampagueApi.put(`/api/users/${userId}/active`, { activo });
    dispatch(updateUserInStore(data.user));
    Swal.fire({
      icon: "success",
      title: "Usuario actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return data.user;
  } catch (error) {
    console.error("Error updating user active status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el usuario",
    });
    throw error;
  } 
};

export const updateUserRole = (userId, rol_id) => async (dispatch) => {
  try {
    const { data } = await carampagueApi.put(`/api/users/${userId}/role`, { rol_id });
    dispatch(updateUserInStore(data.user));
    Swal.fire({
      icon: "success",
      title: "Rol actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return data.user;
  } catch (error) {
    console.error("Error updating user role:", error);
    dispatch(setError(["Error actualizando el rol"]));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el rol",
    });
    throw error;
  } 
};

// DELETE: Eliminar un usuario
export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await carampagueApi.delete(`/api/users/${userId}`);
    dispatch(removeUser(userId));
    Swal.fire({
      icon: "success",
      title: "Usuario eliminado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el usuario",
    });
  } finally {
    dispatch(endLoading());
  }
};
