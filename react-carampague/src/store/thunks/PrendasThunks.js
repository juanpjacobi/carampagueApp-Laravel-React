import carampagueApi from "../../api/carampagueApi";
import { addPrenda, addTalle, addTipoPrenda, setPrendas, setTalles, setTipoPrendas, updatePrendaInStore } from "../slices/PrendasSlice";
import Swal from "sweetalert2";

export const getPrendas = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get("/api/prendas");
    dispatch(setPrendas(data.prendas));
  } catch (error) {
    console.error("Error fetching prendas:", error);
  }
};

export const getTiposPrendas = () => async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/tipos-prenda");
      dispatch(setTipoPrendas(data.tipos_prenda));
    } catch (error) {
      console.error("Error fetching tipos prendas:", error);
    }
  };

  export const getTalles = () => async (dispatch) => {
    try {
      const { data } = await carampagueApi.get("/api/talles");
      dispatch(setTalles(data.talles));
    } catch (error) {
      console.error("Error fetching talles:", error);
    }
  };

  export const createPrenda = (prendaData) => async (dispatch) => {
    try {
      const { data } = await carampagueApi.post("/api/prendas", prendaData);
      dispatch(addPrenda(data.prenda));
      Swal.fire({
        icon: "success",
        title: "Prenda creada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return data.prenda;
    } catch (error) {
      console.error("Error creating prenda:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la prenda",
      });
      throw error;
    }
  };
  
  export const updatePrenda = (prendaData, prendaId) => async (dispatch) => {
    try {
      const { data } = await carampagueApi.put(`/api/prendas/${prendaId}`, prendaData);
      dispatch(updatePrendaInStore(data.prenda));
      Swal.fire({
        icon: "success",
        title: "Prenda actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return data.prenda;
    } catch (error) {
      console.error("Error updating prenda:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la prenda",
      });
      throw error;
    }
  };
  export const createTipoPrenda = (data) => async (dispatch) => {
    try {
      const { data: response } = await carampagueApi.post("/api/tipos-prenda", data);
      dispatch(addTipoPrenda(response.tipo_prenda));
      Swal.fire({
        icon: "success",
        title: "Tipo de prenda creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.tipo_prenda;
    } catch (error) {
      console.error("Error creating tipo prenda:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el tipo de prenda",
      });
      throw error;
    }
  };
  export const createTalle = (data) => async (dispatch) => {
    try {
      const { data: response } = await carampagueApi.post("/api/talles", data);
      dispatch(addTalle(response.talle));
      Swal.fire({
        icon: "success",
        title: "Talle creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.talle;
    } catch (error) {
      console.error("Error creating talle:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el talle",
      });
      throw error;
    }
  };


