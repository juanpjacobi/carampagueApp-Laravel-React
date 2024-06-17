import {InfoIcon} from '../utilities/icons/InfoIcon'
export const ObjetivoListItem = ({ objetivo }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {objetivo.nombre.toUpperCase()}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap hidden lg:visible">
      {objetivo.activo ? 'Activo' : 'Inactivo'}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {objetivo.cliente.razon_social}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {objetivo.direccion.calle}{" "}
        {objetivo.direccion.numeracion}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <InfoIcon tipo='objetivos' id={objetivo.id} />
      </td>
    </tr>
  );
};
