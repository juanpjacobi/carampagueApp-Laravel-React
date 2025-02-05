import carampagueApi from "../../api/carampagueApi";
import { setFeriados } from "../slices/FeriadosSlice";
import { startLoading, endLoading, setError } from "../slices/UiSlice";
import Swal from "sweetalert2";

export const getFeriados = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await carampagueApi.get(`/api/feriados/`);
    dispatch(setFeriados(data.feriados));
  } catch (error) {
    const errors = error.response?.data?.errors 
      ? Object.values(error.response.data.errors) 
      : ["Error al obtener feriados"];
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
