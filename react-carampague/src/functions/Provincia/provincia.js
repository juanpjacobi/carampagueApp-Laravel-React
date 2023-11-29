import carampagueApi from "../../api/carampagueApi";


export const getProvincias = async() => {
  try {
    return await carampagueApi.get(`/api/provincias/`);
  } catch (error) {
    console.log(error);
  }
}