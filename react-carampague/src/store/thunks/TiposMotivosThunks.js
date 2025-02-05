import carampagueApi from "../../api/carampagueApi";
import { setTiposMotivos } from "../slices/TiposMotivosSlice";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import Swal from "sweetalert2";

export const getTiposMotivos = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get("/api/tipos-motivos");
    dispatch(setTiposMotivos(data.tipos_motivos));
  } catch (error) {
    const errors = error.response?.data?.errors
      ? Object.values(error.response.data.errors)
      : ["Error al obtener los tipos de motivo"];
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
