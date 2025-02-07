import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { endLoading, setError, startLoading } from "../slices/UiSlice";
import { addTipoAjuste, removeTipoAjuste, setTiposAjustes, updateTipoAjusteEnStore } from "../slices/TiposAjusteSlice";

export const getTiposAjustes = () => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get("/api/tipos-ajustes");
      // Se asume que data.tipos_ajustes es un array
      dispatch(setTiposAjustes(data.tipos_ajustes));
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al obtener tipos de ajustes"];
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
  
  export const createTipoAjuste = (data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.post("/api/tipos-ajustes", data);
      dispatch(addTipoAjuste(response.tipo_ajuste));
      Swal.fire({
        icon: "success",
        title: "Tipo de ajuste creado correctamente",
        showConfirmButton: true,
      });
      return response.tipo_ajuste;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al crear tipo de ajuste"];
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
  
  export const updateTipoAjuste = (tipoId, data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.put(`/api/tipos-ajustes/${tipoId}`, data);
      dispatch(updateTipoAjusteEnStore(response.tipo_ajuste));
      Swal.fire({
        icon: "success",
        title: "Tipo de ajuste actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.tipo_ajuste;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al actualizar tipo de ajuste"];
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
  
  export const deleteTipoAjuste = (tipoId) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await carampagueApi.delete(`/api/tipos-ajustes/${tipoId}`);
      dispatch(removeTipoAjuste(tipoId));
      Swal.fire({
        icon: "success",
        title: "Tipo de ajuste eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al eliminar tipo de ajuste"];
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