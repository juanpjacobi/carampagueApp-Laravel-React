import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllServicios } from "../store/selectors/ServiciosSelectors";

export const useValorHora = (servicioId, periodo, mode = "vigilador") => {
  const servicios = useSelector(selectAllServicios);
  const valores = useSelector((state) => state.valores.valores); // Asegúrate de que `valores` esté precargado en el store
  const objetivos = useSelector((state) => state.objetivos.objetivos);

  const valorHora = useMemo(() => {
    if (servicioId && periodo) {
      // Buscar el servicio por id
      const servicio = servicios.find(
        (s) => Number(s.id) === Number(servicioId)
      );
      if (servicio) {
        // Buscar el objetivo asociado usando el objetivo_id del servicio
        const objetivo = objetivos.find(
          (o) => Number(o.id) === Number(servicio.objetivo_id)
        );
        if (objetivo) {
          const clienteId = Number(objetivo.cliente_id);
          let valorRecord;
          if (mode === "cliente") {
            // Buscar primero el valor específico para el objetivo
            valorRecord = valores.find(
              (v) =>
                Number(v.cliente_id) === clienteId &&
                v.periodo === periodo &&
                Number(v.objetivo_id) === Number(objetivo.id)
            );
            // Si no se encuentra, usar el valor general para el cliente (objetivo_id nulo/ vacío)
            if (!valorRecord) {
              valorRecord = valores.find(
                (v) =>
                  Number(v.cliente_id) === clienteId &&
                  v.periodo === periodo &&
                  (!v.objetivo_id ||
                    v.objetivo_id === "" ||
                    v.objetivo_id === null)
              );
            }
          } else {
            // Para "vigilador", podemos mantener la lógica similar (o ajustarla si es necesario)
            valorRecord = valores.find(
              (v) =>
                Number(v.cliente_id) === clienteId &&
                v.periodo === periodo &&
                Number(v.objetivo_id) === Number(objetivo.id)
            );
            if (!valorRecord) {
              valorRecord = valores.find(
                (v) =>
                  Number(v.cliente_id) === clienteId &&
                  v.periodo === periodo &&
                  (!v.objetivo_id ||
                    v.objetivo_id === "" ||
                    v.objetivo_id === null)
              );
            }
          }
          if (valorRecord && mode === "cliente") {
            return valorRecord.valor_cliente;
          } else if (valorRecord && mode === "vigilador") {
            return valorRecord.valor_vigilador;
          } else {
            return 0;
          }
        }
      }
    }
    return null;
  }, [servicioId, periodo, servicios, objetivos, valores]);

  return valorHora;
};
