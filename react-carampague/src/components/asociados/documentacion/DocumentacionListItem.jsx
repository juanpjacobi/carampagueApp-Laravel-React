import { DateTime } from "luxon";
import { InfoIcon } from "../../utilities/icons/InfoIcon";

export const DocumentacionListItem = ({ linea }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Tipo de documentacion
        </span>
        {linea.tipo_documentacion.nombre_tipo_documentacion}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Fecha de solicitud
        </span>{" "}
        {DateTime.fromISO(linea?.fecha_solicitud).toLocaleString()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>{" "}
        {linea.estado_documentacion.nombre_estado_documentacion}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Fecha de entrega
        </span>
        {linea.fecha_entrega ? DateTime.fromISO(linea?.fecha_entrega).toLocaleString() : '---'}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Fecha de vencimiento
        </span>
        {linea.fecha_vencimiento ? DateTime.fromISO(linea?.fecha_vencimiento).toLocaleString(): '---'}
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>
        <InfoIcon tipo="asociados/documentacion/detalle" id={linea.id} />
      </td>
    </tr>
  );
};
