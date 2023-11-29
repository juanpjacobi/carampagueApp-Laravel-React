import carampagueApi from "../../api/carampagueApi";



export const getTiposTelefono = async() => {
  try {
    return await carampagueApi.get(`/api/tipos-telefono/`);
  } catch (error) {
    console.log(error);
  }
}