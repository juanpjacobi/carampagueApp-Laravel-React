import carampagueApi from "../../api/carampagueApi";
import { setPrendas, setTalles, setTipoPrendas } from "../slices/PrendasSlice";

export const getPrendas = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get("/api/prendas");
    dispatch(setPrendas(data.prendas));
  } catch (error) {
    console.error("Error fetching prendas:", error);
  }
};

export const getTiposPrendas = () => async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/tipos-prenda");
      dispatch(setTipoPrendas(data.tipos_prenda));
    } catch (error) {
      console.error("Error fetching tipos prendas:", error);
    }
  };

  export const getTalles = () => async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/talles");
      dispatch(setTalles(data.talles));
    } catch (error) {
      console.error("Error fetching talles:", error);
    }
  };


