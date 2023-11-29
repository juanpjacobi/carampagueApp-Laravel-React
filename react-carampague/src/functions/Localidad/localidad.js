import carampagueApi from "../../api/carampagueApi";


export const getLocalidades = async() => {
  try {
    return await carampagueApi.get(`/api/localidades/`);
  } catch (error) {
    console.log(error);
  }
}

export const createLocalidad = async(localidad) => {
  try {
    return await carampagueApi.post(`/api/localidades/`, localidad);
  } catch (error) {
    console.log(error);
  }
}