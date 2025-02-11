import Swal from "sweetalert2";
import carampagueApi from "../../api/carampagueApi";
import { addFactura, removeFactura, setFacturas, updateFacturaEnStore } from "../slices/FacturasSlice";
import { endLoading, setError, startLoading } from "../slices/UiSlice";

export const getFacturas = () => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get("/api/facturas");
      dispatch(setFacturas(data.facturas));
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al obtener facturas"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
  
  export const createFactura = (data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.post("/api/facturas", data);
      dispatch(addFactura(response.ajuste));
      Swal.fire({
        icon: "success",
        title: "Factura creada correctamente",
        showConfirmButton: true,
      });
      return response.ajuste;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al crear factura"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
      throw error;
    } finally {
      dispatch(endLoading());
    }
  };
  
  export const updateFactura = (facturaId, data) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.put(`/api/facturas/${facturaId}`, data);
      dispatch(updateFacturaEnStore(response.factura));
      Swal.fire({
        icon: "success",
        title: "Factura actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.factura;
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al actualizar factura"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
      throw error;
    } finally {
      dispatch(endLoading());
    }
  };
  
  export const deleteFactura = (facturaId) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await carampagueApi.delete(`/api/facturas/${facturaId}`);
      dispatch(removeFactura(facturaId));
      Swal.fire({
        icon: "success",
        title: "Factura eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const errors = error.response?.data?.errors
        ? Object.values(error.response.data.errors)
        : ["Error al eliminar factura"];
      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errors.join(", "),
      });
    } finally {
      dispatch(endLoading());
    }
  };
  