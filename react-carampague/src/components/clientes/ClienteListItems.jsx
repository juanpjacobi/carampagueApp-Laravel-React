import {InfoIcon} from '../utilities/icons/InfoIcon'
export const ClienteListItems = ({ cliente }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.razon_social}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
      {cliente.activo ? 'Activo' : 'Inactivo'}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.email}
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {cliente.telefono.numero_telefono} (
        {cliente.telefono.tipo_telefono.nombre_tipo_telefono})
      </td>
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        <InfoIcon tipo='clientes' id={cliente.id} />
      </td>
    </tr>
  );
};
