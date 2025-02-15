import React, { useMemo } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { useMotivos } from "../../hooks";
import { MotivoModal } from "../servicios/MotivoModal";
import { toggleJustificado } from "../../store/thunks/LineasServiciosThunks";

export const AusentismoListItem = ({
  linea,
  onToggleJustificado,
}) => {
    const dispatch = useDispatch();

    const motivos = useSelector((state) => Object.values(state.motivos.motivos || {}));
    const motivosForLinea = motivos.filter(
        (motivo) => Number(motivo.linea_servicio_id) === Number(linea.id)
      );

      const tieneMotivo = motivosForLinea.length > 0;
      const asociados = useSelector((state) => state.asociados.asociados);

      const asociado = useMemo(() => {
        return asociados.find(a => Number(a.id) === Number(linea.asociado_id));
      }, [linea.asociado_id, asociados]);

      const asociadoNombre = asociado
      ? `${asociado.nombre} ${asociado.apellido}`
      : "Sin asociado";

      const fechaFormateada = DateTime.fromISO(linea.fecha).toLocaleString();
      const {
        tiposMotivos,
        motivoEditable,
        setMotivoEditable,
        showMotivoModal,
        setShowMotivoModal,
        handleGuardarMotivo,
        handleInvalidarLinea,
      } = useMotivos(linea);
  const handleEditarMotivo = () => {
    if (motivosForLinea && motivosForLinea.length > 0) {
      setMotivoEditable(motivosForLinea[0]);
      setShowMotivoModal(true);
    } else {
      console.error("La línea no tiene motivos asignados.");
    }
  };


  const handleToggleJustificado = () => {
    const nuevoValor = !linea.is_justificado;
    dispatch(toggleJustificado(linea.id, nuevoValor));
  };


  return (
    <>
    <tr className="p-5 bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700 ">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Fecha</span>
        {fechaFormateada}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Asociado
        </span>

        {asociadoNombre}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Total horas
        </span>
        {linea.horas_reales ?? "00.00"}
      </td>


      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Justificado{" "}
        </span>

        {linea.is_justificado ? "Justificado" : "No justificado"}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Motivo</span>
        {tieneMotivo ? (
          <button
            onClick={handleEditarMotivo}
            className="text-blue-600 hover:underline"
          >
            Ver/Editar Motivo
          </button>
        ) : (
          <span className="text-red-500">Sin motivo</span>
        )}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
      <span className="inline-block w-1/3 md:hidden font-bold">Acciones</span>

        <button
          onClick={handleToggleJustificado}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          {linea.is_justificado
            ? "Revertir Justificación"
            : "Marcar Justificado"}
        </button>
      </td>
    </tr>
    {showMotivoModal && (
        <MotivoModal
          onClose={() => setShowMotivoModal(false)}
          onSubmit={handleGuardarMotivo}
          tiposMotivos={tiposMotivos}
          motivoEditable={motivoEditable}
        />
      )}
      </>
  );
};
