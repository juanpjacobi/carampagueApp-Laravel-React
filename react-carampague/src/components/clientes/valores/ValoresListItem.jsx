import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

export const ValoresListItem = ({ valor }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Cliente</span>
        {valor.cliente.razon_social.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Objetivo</span>
        {valor.objetivo_id ? valor.objetivo.nombre.toUpperCase() : 'VALOR GENERAL'}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Valor vigilador</span>
        $ {valor.valor_vigilador.toLocaleString()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Valor cliente</span>
        $ {valor.valor_cliente.toLocaleString()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Periodo</span>
         {valor.periodo}
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Editar</span>
        <Link to={`/clientes/valores/edit/${valor.cliente_id}/${valor.id}`} className="text-teal-700">
          <AiFillEdit size={25}/>
        </Link>
      </td>
    </tr>
  );
};
