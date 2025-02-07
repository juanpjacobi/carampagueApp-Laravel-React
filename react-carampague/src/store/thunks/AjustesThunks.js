import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";
import { addAjuste, removeAjuste, setAjustes, updateAjusteEnStore } from "../slices/AjustesSlice";
import { endLoading, setError, startLoading } from "../slices/UiSlice";

export const getAjustes = () => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get("/api/ajustes");
      // Se asume que data.ajustes es un array de ajustes
      dispatch(setAjustes(data.ajustes));
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al obtener ajustes"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
  
  export const createAjuste = (data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.post("/api/ajustes", data);
      dispatch(addAjuste(response.ajuste));
      Swal.fire({
        icon: "success",
        title: "Ajuste creado correctamente",
        showConfirmButton: true,
      });
      return response.ajuste;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al crear ajuste"];
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
  
  export const updateAjuste = (ajusteId, data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.put(`/api/ajustes/${ajusteId}`, data);
      dispatch(updateAjusteEnStore(response.ajuste));
      Swal.fire({
        icon: "success",
        title: "Ajuste actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.ajuste;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al actualizar ajuste"];
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
  
  export const deleteAjuste = (ajusteId) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await carampagueApi.delete(`/api/ajustes/${ajusteId}`);
      dispatch(removeAjuste(ajusteId));
      Swal.fire({
        icon: "success",
        title: "Ajuste eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al eliminar ajuste"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
  