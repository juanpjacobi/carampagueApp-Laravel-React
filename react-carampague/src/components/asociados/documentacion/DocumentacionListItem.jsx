import { DateTime } from "luxon";
import { InfoIcon } from "../../utilities/icons/InfoIcon";

export const DocumentacionListItem = ({ linea }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {linea.tipo_documentacion.nombre_tipo_documentacion}
      </td>

      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {DateTime.fromISO(linea?.fecha_solicitud).toLocaleString()}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {linea.estado_documentacion.nombre_estado_documentacion}
      </td>

      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {DateTime.fromISO(linea?.fecha_entrega).toLocaleString()}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {DateTime.fromISO(linea?.fecha_vencimiento).toLocaleString()}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <InfoIcon tipo="asociados/documentacion/detalle" id={linea.id} />
      </td>
    </tr>
  );
};
