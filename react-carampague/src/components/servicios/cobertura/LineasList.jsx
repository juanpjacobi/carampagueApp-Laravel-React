import { useState, useEffect } from "react";
import { LineaListItem } from "./LineaListItem";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCobertura,
  createPlanDiario,
} from "../../../store/thunks/ServiciosThunks";
import { Alerta } from "../../shared/Alerta";

export const LineasList = ({
  lineas,
  isPlanDiario,
  servicioId,
  onEditLinea,
}) => {
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  // const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [fechaDesde, setFechaDesde] = useState(
    primerDiaMes.toISOString().split("T")[0]
  );
  const [fechaHasta, setFechaHasta] = useState("");
  const [fechaInicioServicio, setFechaInicioServicio] = useState("");
  const [fechaFinServicio, setFechafinServicio] = useState("");
  const [lineasFiltradas, setLineasFiltradas] = useState([]);
  const [dateError, setDateError] = useState("");

  const { feriados } = useSelector((state) => state.feriados);

  useEffect(() => {
    handleFiltrar();
  }, [lineas]);

  const handleFiltrar = () => {
    const desde = fechaDesde ? new Date(fechaDesde) : null;
    const hasta = fechaHasta ? new Date(fechaHasta) : null;

    const nuevasLineas = (lineas || []).filter((linea) => {
      const fechaLinea = new Date(linea.fecha);
      if (desde && fechaLinea < desde) return false;
      if (hasta && fechaLinea > hasta) return false;
      return true;
    });

    setLineasFiltradas(nuevasLineas);
  };

  const handleGenerarLineas = async () => {
    // Validar que ambas fechas del servicio estén definidas
    if (!fechaInicioServicio || !fechaFinServicio) {
      setDateError("Debe ingresar la fecha de inicio y fin del servicio.");
      return;
    }
    // Validar que la fecha fin no sea menor que la fecha inicio
    if (new Date(fechaFinServicio) < new Date(fechaInicioServicio)) {
      setDateError(
        "La fecha fin del servicio no puede ser menor que la fecha de inicio."
      );
      return;
    }
    // Si la validación es correcta, limpiar el error y proceder
    setDateError("");

    const data = {
      fecha_inicio_servicio: fechaInicioServicio,
      fecha_fin_servicio: fechaFinServicio,
    };
    const theId = servicioId || id;
    if (!theId) return;
    await dispatch(createCobertura(data, id));
  };

  const handleGenerarPlanDiario = async () => {
    // Validar que ambas fechas del servicio estén definidas
    if (!fechaInicioServicio || !fechaFinServicio) {
      setDateError("Debe ingresar la fecha de inicio y fin del servicio.");
      return;
    }
    // Validar que la fecha fin no sea menor que la fecha inicio
    if (new Date(fechaFinServicio) < new Date(fechaInicioServicio)) {
      setDateError(
        "La fecha fin del servicio no puede ser menor que la fecha de inicio."
      );
      return;
    }
    // Si la validación es correcta, limpiar el error y proceder
    setDateError("");
    const data = {
      fecha_inicio_servicio: fechaInicioServicio,
      fecha_fin_servicio: fechaFinServicio,
    };

    const theId = servicioId || id;
    if (!theId) return;

    await dispatch(createPlanDiario(data, theId));
  };
  return (
    <div className="flex flex-col mt-2 space-y-4">
      {!isPlanDiario && (
        <>
          <h1 className="text-3xl text-sky-700 font-semibold text-center mb-5">
            Cobertura (Servicio)
          </h1>
          <div className="flex justify-center">
            {dateError && <Alerta error={dateError} />}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-3">
            <div className="flex items-end gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="fechaDesde"
                  className="text-sm font-medium text-slate-700"
                >
                  Desde:
                </label>
                <input
                  type="date"
                  id="fechaDesde"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="border border-slate-950 rounded p-2 text-sm bg-gray-200 text-center"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="fechaHasta"
                  className="text-sm font-medium text-slate-700"
                >
                  Hasta:
                </label>
                <input
                  type="date"
                  id="fechaHasta"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="border border-slate-950 rounded p-2 text-sm bg-gray-200 text-center"
                />
              </div>

              <button
                onClick={handleFiltrar}
                className="bg-sky-600 text-white text-sm font-semibold px-3 py-2.5 rounded hover:bg-sky-700"
              >
                Filtrar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4  items-end lg:flex">
              <div className="flex flex-col">
                <label
                  htmlFor="fechaInicioServicio"
                  className="text-sm font-medium text-slate-700"
                >
                  Desde:
                </label>
                <input
                  type="date"
                  id="fechaInicioServicio"
                  value={fechaInicioServicio}
                  onChange={(e) => setFechaInicioServicio(e.target.value)}
                  className="border border-slate-950 rounded p-2 text-sm bg-gray-200 text-center"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fechaFinServicio"
                  className="text-sm font-medium text-slate-700"
                >
                  Hasta:
                </label>
                <input
                  type="date"
                  id="fechaFinServicio"
                  value={fechaFinServicio}
                  onChange={(e) => setFechafinServicio(e.target.value)}
                  className="border border-slate-950 rounded p-2 text-sm bg-gray-200 text-center"
                />
              </div>
              {/* Botón: Generar */}
              <button
                onClick={handleGenerarLineas}
                className="bg-teal-600 text-white text-sm font-semibold px-3 py-2.5 rounded hover:bg-teal-700"
              >
                Generar
              </button>
              {/* Botón: Generar plan diario */}
              <button
                onClick={handleGenerarPlanDiario}
                className="bg-sky-600 text-white text-sm font-semibold px-3 py-2.5 rounded hover:bg-sky-700"
              >
                Generar plan diario
              </button>
            </div>
          </div>
        </>
      )}

      {/* Tabla de líneas */}
      <div className="flex flex-col shadow-2xl md:shadow-gray-500">
        <table className="w-full text-sm text-left min-w-full border-collapse block md:table">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200 block md:table-header-group">
            <tr className="border-l-4 border-slate-400 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              {!isPlanDiario && (
                <th
                  scope="col"
                  className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                >
                  Fecha
                </th>
              )}

              {isPlanDiario && (
                <>
                  <th
                    scope="col"
                    className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                  >
                    Estado
                  </th>

                  <th
                    scope="col"
                    className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                  >
                    Objetivo
                  </th>
                </>
              )}

              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Asociado
              </th>
              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Hora Inicio
              </th>
              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Hora Fin
              </th>
              {isPlanDiario && (
                <>
                  <th
                    scope="col"
                    className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                  >
                    Hora Real Inicio
                  </th>
                  <th
                    scope="col"
                    className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                  >
                    Hora Real Fin
                  </th>
                  <th
                    scope="col"
                    className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                  >
                    Total Horas
                  </th>
                </>
              )}
              {!isPlanDiario && (
                <th
                  scope="col"
                  className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
                >
                  Total horas
                </th>
              )}
              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {lineasFiltradas?.map((linea) => (
              <LineaListItem
                feriados={feriados}
                linea={linea}
                key={linea.id}
                isPlanDiario={isPlanDiario}
                onEditLinea={onEditLinea}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
