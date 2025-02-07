import { formatFechaConDia } from "../utilities/hora-formatter/horaFormatter";
import { EstadoBadge } from "../ui/lineas/EstadoBadge";
import { useServicioObjetivo, useValorHora } from "../../hooks";
import { useSelector } from "react-redux";

export const ComputosListItem = ({ linea }) => {
  const { servicios } = useSelector((state) => state.servicios);
  const { nombreObjetivo } = useServicioObjetivo(linea, servicios);
  const periodo = `${linea.fecha.slice(0, 4)}-${linea.fecha.slice(5, 7)}`; 

  const valorHora = useValorHora(linea.servicio_id, periodo); 

  return (
    <tr
      className={
        "p-5 bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700 "
      }
    >
      <td
        className={
          "p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell"
        }
      >
        <span className="inline-block w-1/3 md:hidden font-bold">Fecha</span>
        {formatFechaConDia(linea.fecha)}
      </td>

      <>
        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
          <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>
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

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Hora Inicio
        </span>
        {linea.hora_inicio}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Hora Fin</span>
        {linea.hora_fin}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Total horas
        </span>
        {linea.horas_reales ?? "00.00"}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Valor hora
        </span>
        {valorHora ? `$ ${valorHora.toLocaleString()}` : "00.00"}

      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Valor hora
        </span>
        {valorHora && linea.horas_reales
          ? `$ ${(valorHora * linea.horas_reales).toLocaleString()}`
          : "00.00"}
      </td>
    </tr>
  );
};
