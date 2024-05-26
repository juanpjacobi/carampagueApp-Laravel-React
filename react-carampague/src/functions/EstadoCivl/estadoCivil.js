import carampagueApi from "../../api/carampagueApi";



export const getEstadosCiviles = async() => {
  try {
    return await carampagueApi.get(`/api/estados-civiles/`);
  } catch (error) {
    console.log(error);
  }
}