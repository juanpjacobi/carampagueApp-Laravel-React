import carampagueApi from "../../api/carampagueApi";
import {
  setBarrios,
  setLocalidades,
  setProvincias,
} from "../slices/UbicacionesSlice";

export const getLocalidades = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get(`/api/localidades/`);
    dispatch(setLocalidades(data.localidades));
  } catch (error) {
    console.error("Error fetching localidades:", error);
  }
};

export const getProvincias = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get(`/api/provincias/`);

    dispatch(setProvincias(data.provincias));
  } catch (error) {
    console.error("Error fetching provincias:", error);
  }
};

export const getBarrios = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get(`/api/barrios/`);

    dispatch(setBarrios(data.barrios));
  } catch (error) {
    console.error("Error fetching barrios:", error);
  }
};
