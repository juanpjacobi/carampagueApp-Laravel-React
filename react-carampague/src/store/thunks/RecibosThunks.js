// src/store/thunks/recibosThunks.js
import carampagueApi from '../../api/carampagueApi'; // o tu instancia de axios configurada
import Swal from 'sweetalert2';
import { setRecibos, addRecibo } from '../slices/RecibosSlice';
import { endLoading, setError, startLoading } from '../slices/UiSlice';

export const getRecibos = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.get('/api/recibos');
      dispatch(setRecibos(data.recibos));
    } catch (error) {
      const errors = error.response?.data?.error || error.message;
      dispatch(setError(errors));
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener recibos',
        text: errors,
      });
    } finally {
      dispatch(endLoading());
    }
  };
};

export const createRecibo = (reciboData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await carampagueApi.post('/api/recibos', reciboData);
      dispatch(addRecibo(data.recibo));
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Recibo generado correctamente',
        showConfirmButton: true,
      });
      return data.recibo;
    } catch (error) {
      const errors = error.response?.data?.error || error.message;
      dispatch(setError(errors));
      Swal.fire({
        icon: 'error',
        title: 'Error al generar recibo',
        text: errors,
      });
      throw error;
    } finally {
      dispatch(endLoading());
    }
  };
};
