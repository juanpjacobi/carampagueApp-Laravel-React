import { useDispatch, useSelector } from "react-redux";

import { TimePicker } from "../../utilities/timePicker/TimePicker";
import { MotivoModal } from "../MotivoModal";
import clsx from "clsx";
import { formatFechaConDia } from "../../utilities/hora-formatter/horaFormatter";

import {
  useAsociados,
  useEsFeriado,
  useHorasReales,
  useMotivos,
  useServicioObjetivo,
  useValidacionLinea,
} from "../../../hooks";
import { AsociadoDropdown } from "../../ui/lineas/AsociadoDropdown";
import { EstadoBadge } from "../../ui/lineas/EstadoBadge";
import { AccionesLinea } from "../../ui/lineas/AccionesLinea";
import { asignarAsociado, eliminarLineaServicio } from "../../../store/thunks/LineasServiciosThunks";

export const LineaListItem = ({
  linea,
  feriados,
  isPlanDiario,
  onEditLinea,
}) => {
  const { servicios } = useSelector((state) => state.servicios);


  const dispatch = useDispatch();

  const {
    tiposMotivos,
    motivoEditable,
    setMotivoEditable,
    showMotivoModal,
    setShowMotivoModal,
    handleGuardarMotivo,
    handleInvalidarLinea,
  } = useMotivos(linea);

  const {
    asociadoQuery,
    setAsociadoQuery,
    filteredAsociados,
    showDropdown,
    setShowDropdown,
    inputRef,
  } = useAsociados(linea.asociado_id);

  const {
    horaRealInicio,
    horaRealFin,
    handleHoraInicioChange,
    handleHoraFinChange,
    isHoraMenor,
  } = useHorasReales(linea, dispatch);

  const { handleToggleValidado } = useValidacionLinea(linea, dispatch);
  const { nombreObjetivo } = useServicioObjetivo(linea, servicios);
  const planInicioHHMM = linea.hora_inicio.slice(0, 5);

  const esFeriado = useEsFeriado(feriados, linea.fecha);

  const handleEditarMotivo = (motivo) => {
    setMotivoEditable(motivo);
    setShowMotivoModal(true);
  };

  const handleSelectAsociado = async (asociadoId, fullName) => {
    const data = { asociado_id: asociadoId };
    setAsociadoQuery(fullName);
    await dispatch(asignarAsociado(data, linea.id));
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  const handleDesasignarAsociado = async () => {
    const data = { asociado_id: null };
    await dispatch(asignarAsociado(data, linea.id));
    setAsociadoQuery("");
  };

  const handleEliminarLinea = async () => {
    try {
      await dispatch(eliminarLineaServicio(linea.id));
    } catch (error) {
      console.error("Error eliminando la línea:", error);
    }
  };

  return (
    <>
          {showMotivoModal && (
          <MotivoModal
            onClose={() => setShowMotivoModal(false)}
            onSubmit={handleGuardarMotivo}
            tiposMotivos={tiposMotivos}
            motivoEditable={motivoEditable}
          />
        )}
      <tr
        className={clsx(
          "p-5  bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700 ",
          isPlanDiario && {
            "border-l-4 border-green-400": linea.is_validado === true,
            "border-l-4 border-red-400": linea.is_validado === false,
            "border-l-4 border-yellow-400":
              linea.is_validado === null || linea.is_validado === undefined,
          }
        )}
      >
        {!isPlanDiario && (
          <td
            className={clsx(
              "p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell",
              {
                "text-red-600 font-bold": esFeriado, // Aplica si es feriado
              }
            )}
          >
            <span className="inline-block w-1/3 md:hidden font-bold">
              Fecha
            </span>
            {formatFechaConDia(linea.fecha)}
          </td>
        )}

        {isPlanDiario && (
          <>
            <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
              <span className="inline-block w-1/3 md:hidden font-bold">
                Estado
              </span>
              <div className="mt-1">
                <EstadoBadge isValidado={linea.is_validado} />
              </div>
            </td>
            <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
              <span className="inline-block w-1/3 md:hidden font-bold">
                Objetivo
              </span>
              {nombreObjetivo.toUpperCase()}
            </td>
          </>
        )}
        <td className="p-2 border-b border-slate-300 md:border-none text-left md:table-cell relative flex flex-col">
          <span className="inline-block w-1/3 md:hidden font-bold">
            Asociado
          </span>
          <AsociadoDropdown
            asociadoQuery={asociadoQuery}
            setAsociadoQuery={setAsociadoQuery}
            filteredAsociados={filteredAsociados}
            handleSelectAsociado={handleSelectAsociado}
            handleDesasignarAsociado={handleDesasignarAsociado}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </td>

        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
          <span className="inline-block w-1/3 md:hidden font-bold">
            Hora Inicio
          </span>
          {linea.hora_inicio}
        </td>

        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
          <span className="inline-block w-1/3 md:hidden font-bold">
            Hora Fin
          </span>
          {linea.hora_fin}
        </td>
        {!isPlanDiario && (
          <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
            <span className="inline-block w-1/3 md:hidden font-bold">
              Total horas
            </span>
            {linea.horas_planificadas}
          </td>
        )}

        {isPlanDiario && (
          <>
            <td className="p-2 border-b flex flex-col border-slate-300 md:border-none text-left md:table-cell">
              <TimePicker
                value={horaRealInicio}
                onChange={handleHoraInicioChange}
              />

              {isHoraMenor() && (
                <span className="text-xs text-orange-500 mt-1">
                  Se tomará desde la hora planificada ({planInicioHHMM})
                </span>
              )}
            </td>

            <td className="p-2 border-b flex flex-col border-slate-300 md:border-none text-left md:table-cell">
              <TimePicker value={horaRealFin} onChange={handleHoraFinChange} />
            </td>
            <td className="p-2 border-b flex flex-col border-slate-300 md:border-none text-left md:table-cell">
              <div className="flex md:flex-col flex-row justify-between md:justify-around items-center">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Total Horas
                </span>
                <span className="text-center p-2 border md:inline-block md:w-full border-slate-200 rounded-md">
                  {linea.horas_reales ?? "00.00"}
                </span>
              </div>
            </td>
          </>
        )}

        <td className="p-2 border-b flex flex-col border-slate-300 md:border-none text-left md:table-cell">
          <AccionesLinea
            linea={linea}
            isPlanDiario={isPlanDiario}
            onEditLinea={onEditLinea}
            handleToggleValidado={handleToggleValidado}
            handleInvalidarLinea={handleInvalidarLinea}
            handleEditarMotivo={handleEditarMotivo}
            handleEliminarLinea={handleEliminarLinea}
          />{" "}
        </td>

      </tr>

    </>
  );
};
