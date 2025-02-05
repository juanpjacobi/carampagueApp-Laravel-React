import carampagueApi from "../../api/carampagueApi";
import { setTiposTelefonos } from "../slices/TipoTelefonosSlice";

export const getTiposTelefonos = () => async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/tipos-telefono");
      dispatch(setTiposTelefonos(data.tipos_telefonos));
    } catch (error) {
      console.error("Error fetching tipos telefonos:", error);
    }
  };
