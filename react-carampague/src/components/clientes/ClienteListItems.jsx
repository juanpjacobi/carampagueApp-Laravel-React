import React from "react";
import {InfoIcon} from '../utilities/icons/InfoIcon'
export const ClienteListItems = ({ cliente }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <a href="">{cliente.razon_social}</a>
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.estado.nombre_estado}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.email}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.telefono.numero_telefono} (
        {cliente.telefono.tipo_telefono.nombre_tipo_telefono})
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <InfoIcon id={cliente.id} />
      </td>
    </tr>
  );
};
