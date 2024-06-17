import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

export const createEntregaRopa = async (data, navigate, id) => {
    try {
       await carampagueApi.post(`/api/entrega-ropa/`, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Entrega de ropa registrada con éxito",
        showConfirmButton: true,
      }).then(() => {
        navigate(`/asociados/${id}`);
      });
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.errors,
        footer: "Error al crear entrega de ropa",
      });
    }
  }

export const updateEntregaRopa = async (data, navigate, entrega_id, id) => {
  try {
     await carampagueApi.put(`/api/entrega-ropa/${entrega_id}`, data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Entrega de ropa editada con éxito",
      showConfirmButton: true,
    }).then(() => {
      navigate(`/asociados/${id}`);
    });
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.error,
      footer: "Error al editar entrega de ropa",
    });
  }
}

  export const getPrendas = async() => {
    try {
      return await carampagueApi.get(`/api/prendas`);
    } catch (error) {
      console.log(error);
    }
  }

  export const getTiposPrenda = async() => {
    try {
      return await carampagueApi.get(`/api/talles`);
    } catch (error) {
      console.log(error);
    }
  }