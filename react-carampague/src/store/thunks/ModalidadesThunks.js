import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import { setModalidades, addModalidad, updateModalidadEnStore } from "../slices/ModalidadesSlice";

export const getModalidades = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get("/api/modalidades/");
    dispatch(setModalidades(data.modalidades));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener modalidades"];
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

export const getModalidadesPorServicioId = (servicioId) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get(`/api/modalidades?servicio_id=${servicioId}`);
    // Se asume que data.modalidades es un array de modalidades completas para ese servicio
    dispatch(setModalidades(data.modalidades));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener modalidades"];
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

export const createModalidad = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data: response } = await carampagueApi.post("/api/modalidades/", data);
    dispatch(addModalidad(response.modalidad));
    Swal.fire({
      icon: "success",
      title: "Modalidad creada correctamente",
      showConfirmButton: true,
    });
    return response.modalidad;
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al crear modalidad"];
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

export const updateModalidad = (id, data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data: response } = await carampagueApi.put(`/api/modalidades/${id}`, data);
    dispatch(updateModalidadEnStore(response.modalidad));
    Swal.fire({
      icon: "success",
      title: "Modalidad actualizada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return response.modalidad;
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al actualizar modalidad"];
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
