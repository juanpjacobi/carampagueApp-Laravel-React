import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllServicios } from '../store/selectors/ServiciosSelectors';

export const useValorHora = (servicioId, periodo) => {
  const servicios = useSelector(selectAllServicios); 
  const valores = useSelector(state => state.valores.valores); // Asegúrate de que `valores` esté precargado en el store
  const objetivos = useSelector((state) => state.objetivos.objetivos);

  const valorHora = useMemo(() => {
    if (servicioId && periodo) {
      // Buscar el servicio por id
      const servicio = servicios.find((s) => Number(s.id) === Number(servicioId));
      if (servicio) {
        // Buscar el objetivo asociado usando el objetivo_id del servicio
        const objetivo = objetivos.find(
          (o) => Number(o.id) === Number(servicio.objetivo_id)
        );
        if (objetivo) {
          const clienteId = Number(objetivo.cliente_id);
          // Primero, buscamos el valor específico para el objetivo
          const valorObjetivo = valores.find(
            (v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              Number(v.objetivo_id) === Number(objetivo.id)
          );
          if (valorObjetivo) {
            return valorObjetivo.valor_vigilador;
          }
          // Si no hay valor específico para el objetivo, buscamos el valor general del cliente
          const valorCliente = valores.find(
            (v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              (v.objetivo_id === null || v.objetivo_id === "")
          );
          if (valorCliente) {
            return valorCliente.valor_vigilador;
          }
        }
      }
    }
    return null;
  }, [servicioId, periodo, servicios, objetivos, valores]);

  return valorHora;
};