import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { AiFillEdit } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";

export const EntregaRopaListItem = ({ linea }) => {
  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
  <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block  w-1/3 md:hidden font-bold">Descripcion</span>        {linea.descripcion}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold">Fecha de entrega</span>        {DateTime.fromISO(linea?.fecha).toLocaleString()}
      </td>

      <td className="p-2 text-left flex justify-between md:table-cell">
      <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>  
        <div className="flex gap-5">
             <Link to={`/asociados/entrega-ropa/detalle/${linea.id}`}>
          <BsInfoSquareFill  width={50} height={50} />
        </Link>
        <Link to={`/asociados/entrega-ropa/edit/${linea.id}`}>
          <AiFillEdit width={50} height={50}/>
        </Link>

        </div>
      </td>
    </tr>
  );
};
