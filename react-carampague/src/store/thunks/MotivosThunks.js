import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import { setMotivos, addMotivo, updateMotivoEnStore } from "../slices/MotivosSlices";
import { updateLineaServicioEnStore } from "../slices/LineasServiciosSlice";

export const getMotivos = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get("/api/motivos/");
    // Se asume que data.motivos es un array de motivos
    dispatch(setMotivos(data.motivos));
  } catch (error) {
    console.log(error)
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener motivos"];
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

export const createMotivo = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data: response } = await carampagueApi.post("/api/motivos", data);
    dispatch(addMotivo(response.motivo));
    Swal.fire({
      icon: "success",
      title: "Motivo creado correctamente",
      showConfirmButton: true,
    });
    return response.motivo;
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al crear motivo"];
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

export const updateMotivo = (motivoId, data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data: response } = await carampagueApi.put(`/api/motivos/${motivoId}`, data);
    // Actualizamos el motivo en el store
    dispatch(updateMotivoEnStore(response.motivo));
    // Si se devolvió la línea actualizada, la actualizamos en el store
    if (response.linea) {
      dispatch(updateLineaServicioEnStore(response.linea));
    }
    Swal.fire({
      icon: "success",
      title: "Motivo actualizado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return response;
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al actualizar motivo"];
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

