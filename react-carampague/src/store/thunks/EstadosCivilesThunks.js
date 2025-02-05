import carampagueApi from "../../api/carampagueApi";
import { setEstadosCiviles, addEstadoCivil, updateEstadoCivilEnStore } from "../slices/EstadosCivilesSlice";

export const getEstadosCiviles = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get("/api/estados-civiles");
    dispatch(setEstadosCiviles(data.estados_civiles));
  } catch (error) {
    console.error("Error fetching estados civiles:", error);
  }
};

export const createEstadoCivil = (data) => async (dispatch) => {
  try {
    const { data: response } = await carampagueApi.post("/api/estados-civiles", data);
    dispatch(addEstadoCivil(response.estado_civil));
  } catch (error) {
    console.error("Error creating condicion IVA:", error);
  }
};

export const updateEstadoCivil = (id, data) => async (dispatch) => {
  try {
    const { data: updatedCondicion } = await carampagueApi.put(`/api/estados-civiles/${id}`, data);
    dispatch(updateEstadoCivilEnStore(updatedCondicion));
  } catch (error) {
    console.error("Error updating condicion IVA:", error);
  }
};