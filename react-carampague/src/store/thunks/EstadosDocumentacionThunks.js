
import carampagueApi from "../../api/carampagueApi";
import { setEstadosDocumentacion } from "../slices/EstadosDocumentacionSlice";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import Swal from "sweetalert2";

export const getEstadosDocumentacion = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get("/api/estados-documentacion");
    dispatch(setEstadosDocumentacion(data.estados_documentacion));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener los estados de documentación"];
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
