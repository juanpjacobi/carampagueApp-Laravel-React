import React from "react";
import { InfoIcon } from "../utilities/icons/InfoIcon";
export const AsociadoListItem = ({ asociado }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Nombre</span>
        {asociado.nombre.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Apellido</span>
        {asociado.apellido.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Numero</span>
        {asociado.numero_asociado}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>
        {asociado.activo ? "Activo" : "Inactivo"}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Telefono</span>
          {asociado.telefono.numero_telefono} ({asociado.tipo_telefono.nombre})
          </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>
        <InfoIcon tipo="asociados" id={asociado.id} />
      </td>
    </tr>
  );
};
