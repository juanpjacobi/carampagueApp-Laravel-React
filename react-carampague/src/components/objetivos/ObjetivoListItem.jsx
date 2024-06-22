import {InfoIcon} from '../utilities/icons/InfoIcon'
export const ObjetivoListItem = ({ objetivo }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Nombre</span>
        {objetivo.nombre.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>
      {objetivo.activo ? 'Activo' : 'Inactivo'}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Cliente</span>        {objetivo.cliente.razon_social}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Direccion</span>        {objetivo.direccion.calle}{" "}
        {objetivo.direccion.numeracion}
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>
        <InfoIcon tipo='objetivos' id={objetivo.id} />
      </td>
    </tr>
  );
};
