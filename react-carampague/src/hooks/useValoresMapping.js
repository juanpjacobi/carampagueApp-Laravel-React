// src/hooks/useValoresMapping.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllServicios } from "../store/selectors/ServiciosSelectors";

export const useValoresMapping = (serviceIds, periodo) => {
  // Obtenemos todos los servicios (como arreglo) usando tu selector
  const servicios = useSelector(selectAllServicios);
  // Obtenemos los objetivos y valores del store
  const objetivos = useSelector((state) => state.objetivos.objetivos);
  const valores = useSelector((state) => state.valores.valores);

  return useMemo(() => {
    const mapping = {};
    serviceIds.forEach((serviceId) => {
      // Buscar el servicio correspondiente
      const servicio = servicios.find(
        (s) => Number(s.id) === Number(serviceId)
      );
      if (servicio) {
        // Usamos el objetivo_id que tiene el servicio (ya no está anidado, es un número)
        const objetivo = objetivos.find(
          (o) => Number(o.id) === Number(servicio.objetivo_id)
        );
        if (objetivo) {
          const clienteId = Number(objetivo.cliente_id);
          // Buscamos primero el valor específico para el objetivo
          const valorObjetivo = valores.find(
            (v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              Number(v.objetivo_id) === Number(objetivo.id)
          );
          if (valorObjetivo) {
            mapping[serviceId] = Number(valorObjetivo.valor_vigilador);
            return; // Continuamos con el siguiente serviceId
          }
          // Si no hay valor específico, buscamos el valor general para el cliente
          const valorCliente = valores.find(
            (v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              (v.objetivo_id === null || v.objetivo_id === "")
          );
          mapping[serviceId] = valorCliente
            ? Number(valorCliente.valor_vigilador)
            : 0;
        } else {
          mapping[serviceId] = 0;
        }
      }
    });
    return mapping;
  }, [serviceIds, periodo, servicios, objetivos, valores]);
};
