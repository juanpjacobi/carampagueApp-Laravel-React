import { InfoIcon } from "../utilities/icons/InfoIcon";

export const ClienteListItems = ({ cliente }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Razón social</span>
        {cliente.razon_social.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>
        {cliente.activo ? "Activo" : "Inactivo"}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Email</span>
        {cliente.email}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Telefono</span>
        {cliente.telefono.numero_telefono} ({cliente.tipo_telefono.nombre})
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>
        <InfoIcon tipo="clientes" id={cliente.id} />
      </td>
    </tr>
  );
};
