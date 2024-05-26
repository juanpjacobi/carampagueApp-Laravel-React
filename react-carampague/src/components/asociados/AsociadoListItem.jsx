import React from "react";
import {InfoIcon} from '../utilities/icons/InfoIcon'
export const AsociadoListItem = ({ asociado }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {asociado.nombre}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {asociado.apellido}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {asociado.numero_asociado}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {asociado.estado.nombre_estado}
      </td>

      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {asociado.telefono.numero_telefono} (
        {asociado.telefono.tipo_telefono.nombre_tipo_telefono})
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <InfoIcon tipo='asociados' id={asociado.id} />
      </td>
    </tr>
  );
};
