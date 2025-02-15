// src/hooks/useValoresMapping.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllServicios } from "../store/selectors/ServiciosSelectors";

export const useValoresMapping = (serviceIds, periodo, mode = "vigilador") => {
  // Obtenemos todos los servicios (como arreglo) usando el selector
  const servicios = useSelector(selectAllServicios);
  // Obtenemos los objetivos (se asume que están normalizados en el slice "objetivos")
  const objetivos = useSelector((state) => Object.values(state.objetivos.objetivos || {}));
  // Obtenemos los valores desde el slice "valores" (se espera que sean un arreglo)
  const valores = useSelector((state) => state.valores.valores);

  return useMemo(() => {
    const mapping = {};
    serviceIds.forEach((serviceId) => {
      // Buscar el servicio correspondiente
      const servicio = servicios.find((s) => Number(s.id) === Number(serviceId));
      if (servicio) {
        // Buscar el objetivo usando servicio.objetivo_id
        const objetivo = objetivos.find((o) => Number(o.id) === Number(servicio.objetivo_id));
        if (objetivo) {
          const clienteId = Number(objetivo.cliente_id);
          let valorRecord;
          if (mode === "cliente") {
            // Buscar primero el valor específico para el objetivo
            valorRecord = valores.find((v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              Number(v.objetivo_id) === Number(objetivo.id)
            );
            // Si no se encuentra, usar el valor general para el cliente (objetivo_id nulo/ vacío)
            if (!valorRecord) {
              valorRecord = valores.find((v) =>
                Number(v.cliente_id) === clienteId &&
                v.periodo === periodo &&
                (!v.objetivo_id || v.objetivo_id === "" || v.objetivo_id === null)
              );
            }
          } else {
            // Para "vigilador", podemos mantener la lógica similar (o ajustarla si es necesario)
            valorRecord = valores.find((v) =>
              Number(v.cliente_id) === clienteId &&
              v.periodo === periodo &&
              Number(v.objetivo_id) === Number(objetivo.id)
            );
            if (!valorRecord) {
              valorRecord = valores.find((v) =>
                Number(v.cliente_id) === clienteId &&
                v.periodo === periodo &&
                (!v.objetivo_id || v.objetivo_id === "" || v.objetivo_id === null)
              );
            }
          }
          if (valorRecord) {
            mapping[serviceId] =
              mode === "cliente"
                ? Number(valorRecord.valor_cliente)
                : Number(valorRecord.valor_vigilador);
          } else {
            mapping[serviceId] = 0;
          }
        } else {
          mapping[serviceId] = 0;
        }
      }
    });
    return mapping;
  }, [serviceIds, periodo, servicios, objetivos, valores, mode]);
};
