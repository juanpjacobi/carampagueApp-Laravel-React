import carampagueApi from "../../api/carampagueApi";
import Swal from "sweetalert2";

import { startLoading, setError, endLoading } from "../slices/UiSlice";
import {

  addServicioEnStore,
  setServicios,
  updateServicioEnStore,
} from "../slices/ServiciosSlice";
import { getModalidades } from "./ModalidadesThunks";
import { addLineaServicio } from "../slices/LineasServiciosSlice";
export const getServicios = () => {
  return async (dispatch) => {
    try {
      const { data } = await carampagueApi.get(`/api/servicios/`);
      dispatch(setServicios(data.servicios));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );
      const { selectedServicio } = getState().servicios;
      if (selectedServicio) {
        const updated = data.servicios.find(s => s.id === selectedServicio.id);
        dispatch(setSelectedServicio(updated || null));
      }

      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener servicios",
      });
    }
  };
};

export const getServicio = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get(`/api/servicios/${id}`);
      dispatch(setSelectedServicio(data.servicio));
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: Object.values(error.response.data.errors),
        footer: "Error al obtener servicio",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createServicio = (data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data: response } = await carampagueApi.post(
        `/api/servicios/`,
        data
      );
      dispatch(addServicioEnStore(response.servicio));
      dispatch(getModalidades())
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Servicio creado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/servicios");
      });
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors,
        footer: "Error al crear servicio",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const updateServicio = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { data: response } = await carampagueApi.put(
        `/api/servicios/${id}`,
        data
      );
      dispatch(updateServicioEnStore(response.servicio));
      dispatch(getModalidades())

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Servicio actualizado con exito",
        showConfirmButton: true,
      }).then(() => {
        navigate("/servicios");
      });
    } catch (error) {
      const errors = Object.values(error.response.data.errors).map(
        (err) => err
      );

      dispatch(setError(errors));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors,
        footer: "Error al actualizar servicio",
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createCobertura = (data, id) => {
  return async (dispatch) => {
    try {
      const response = await carampagueApi.post(`/api/servicios/${id}/generar-lineas`, data);
      const { lineas, total } = response.data;
      lineas.forEach((linea) => {
        dispatch(addLineaServicio(linea));
      });

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${total} líneas generadas con éxito`,
        showConfirmButton: true,
      });

      } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        footer: "Error al crear cobertura",
      });
    }
  };
};

export const createPlanDiario = (data, id, confirm = false) => {
  return async (dispatch) => {
    try {
      // Agregar confirm al payload si es true
      const payload = confirm ? { ...data, confirm: true } : data;
      const response = await carampagueApi.post(`/api/servicios/${id}/generar-lineas-plan-diario`, payload);

      // Si se requiere confirmación, se muestra el SweetAlert
      if (response.data.needsConfirmation) {
        const result = await Swal.fire({
          title: response.data.message,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, continuar",
          cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) {
          return; // El usuario canceló
        }
        // Si confirma, volvemos a llamar al thunk con confirm=true
        return dispatch(createPlanDiario(data, id, true));
      }

      // Si se crearon líneas, se despachan al store y se muestra el mensaje final
      const { message, lineas, total, omitted } = response.data;
      lineas.forEach((linea) => {
        dispatch(addLineaServicio(linea));
      });
      
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: "Error al crear líneas de plan diario",
      });
    }
  };
};
