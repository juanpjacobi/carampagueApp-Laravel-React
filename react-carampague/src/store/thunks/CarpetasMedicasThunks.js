import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";
import {
  setCarpetasMedicas,
  addCarpetaMedica,

} from "../slices/CarpetasMedicasSlice";
import { endLoading, setError, startLoading } from "../slices/UiSlice";

export const getCarpetasMedicas = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get("/api/carpetas-medicas");
      dispatch(setCarpetasMedicas(data.carpetas_medicas));
    } catch (error) {
      const errors =
        error.response?.data?.error || "Error al obtener carpetas médicas.";
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors,
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createCarpetaMedica = (payload) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.post("/api/carpetas-medicas", payload);
      dispatch(addCarpetaMedica(data.carpeta_medica));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Carpeta médica generada correctamente",
        showConfirmButton: true,
      });
      return data.carpeta_medica;
    } catch (error) {
      const errors =
        error.response?.data?.error || "Error al generar la carpeta médica.";
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors,
      });
      throw error;
    } finally {
      dispatch(endLoading());
    }
  };
};
