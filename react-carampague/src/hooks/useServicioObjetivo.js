import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllServicios } from "../store/selectors/ServiciosSelectors";

export const useServicioObjetivo = (linea) => {
  const servicios = useSelector(selectAllServicios);
  const objetivos = useSelector((state) => state.objetivos.objetivos);

  const servicio = useMemo(() => {
    return servicios.find((s) => Number(s.id) === Number(linea.servicio_id));
  }, [linea.servicio_id, servicios]);

  // Usamos el objetivo_id que viene en el servicio para buscar el objetivo
  const objetivo = useMemo(() => {
    return servicio && servicio.objetivo_id
      ? objetivos.find((o) => Number(o.id) === Number(servicio.objetivo_id))
      : null;
  }, [servicio, objetivos]);

  const nombreObjetivo = useMemo(() => {
    return objetivo?.nombre || "Sin objetivo";
  }, [objetivo]);

  return { servicio, nombreObjetivo };
};
