import carampagueApi from "../../api/carampagueApi";


export const getCondicionesIva = async() => {
  try {
    return await carampagueApi.get(`/api/condiciones-iva/`);
  } catch (error) {
    console.log(error);
  }
}