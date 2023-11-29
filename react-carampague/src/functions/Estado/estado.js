import carampagueApi from "../../api/carampagueApi";


export const getEstados = async() => {
  try {
    return await carampagueApi.get(`/api/estados/`);
  } catch (error) {
    console.log(error);
  }
}
