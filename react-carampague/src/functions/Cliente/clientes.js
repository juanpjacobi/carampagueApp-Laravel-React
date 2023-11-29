import carampagueApi from "../../api/carampagueApi";
import Swal from 'sweetalert2'


export const getClientes = async() => {
  try {
    return await carampagueApi.get(`/api/clientes/`);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: Object.values(error.response.data.errors),
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
export const getCliente = async(id) => {
  try {
    return await carampagueApi.get(`/api/clientes/${id}`);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: Object.values(error.response.data.errors),
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}

export const createCliente = async(data) => {
  try {
    return await carampagueApi.post(`/api/clientes/`, data);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      confirmButtonColor: '#0369A1',  
      title: 'Error al crear registro',
      html: Object.values(error.response.data.errors).map((m) => {
        return "<br>" + m 
      })
    })
  }
}