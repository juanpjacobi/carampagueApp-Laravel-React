
import carampagueApi from "../../api/carampagueApi";
import { setTiposDocumentacion } from "../slices/TiposDocumentacionSlice";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import Swal from "sweetalert2";

export const getTiposDocumentacion = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get("/api/tipos-documentacion");
    dispatch(setTiposDocumentacion(data.tipos_documentacion));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener los tipos de documentación"];
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
