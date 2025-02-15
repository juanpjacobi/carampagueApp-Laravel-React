import { formatFechaConDia } from "../utilities/hora-formatter/horaFormatter";
import { useServicioObjetivo, useValorHora } from "../../hooks";
import { useSelector } from "react-redux";

export const FacturasListItem = ({ linea }) => {
  const { servicios } = useSelector((state) => state.servicios);
  const { asociados } = useSelector((state) => state.asociados);
const asociado = asociados.find((asoc) => asoc.id === linea.asociado_id)
  const { nombreObjetivo } = useServicioObjetivo(linea, servicios);
  const periodo = `${linea.fecha.slice(0, 4)}-${linea.fecha.slice(5, 7)}`; 

  const valorHora = useValorHora(linea.servicio_id, periodo, 'cliente'); 

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
          <span className="inline-block w-1/3 md:hidden font-bold">Asociado</span>
          <div className="mt-1">
            {`${asociado.nombre} ${asociado.apellido} `} 
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
        {linea.horas_planificadas ?? "00.00"}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Valor hora
        </span>
        {valorHora ? `$ ${valorHora.toLocaleString()}` : "00.00"}

      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Subtotal
        </span>
        {valorHora && linea.horas_planificadas
          ? `$ ${(valorHora * linea.horas_planificadas).toLocaleString()}`
          : "00.00"}
      </td>
    </tr>
  );
};
