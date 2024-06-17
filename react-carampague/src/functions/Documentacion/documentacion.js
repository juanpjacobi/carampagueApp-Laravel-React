import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";


export const getDocumentacion = async(id) => {
  try {
    return await carampagueApi.get(`/api/documentaciones/${id}`);
  } catch (error) {
    console.log(error);
  }
}



export const getTiposDocumentacion = async() => {
  try {
    return await carampagueApi.get(`/api/tipos-documentacion`);
  } catch (error) {
    console.log(error);
  }
}

export const getEstadosDocumentacion = async() => {
  try {
    return await carampagueApi.get(`/api/estados-documentacion`);
  } catch (error) {
    console.log(error);
  }
}

export const createLineaDocumentacion = async (data, navigate, id) => {
  try {
     await carampagueApi.post(`/api/lineas-documentacion/`, data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Documentación registrada con éxito",
      showConfirmButton: true,
    }).then(() => {
      navigate(`/asociados/documentacion/${id}`);
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      footer: "Error al registrar documentacion",
    });
  }
}
export const updateLineaDocumentacion = async (data, navigate, linea_id, id) => {
  try {
     await carampagueApi.put(`/api/lineas-documentacion/${linea_id}`, data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Documentación editada con éxito",
      showConfirmButton: true,
    }).then(() => {
      navigate(`/asociados/documentacion/${id}`);
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errors,
      footer: "Error al editar documentacion",
    });
  }
}