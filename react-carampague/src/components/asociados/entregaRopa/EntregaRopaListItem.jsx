import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { AiFillEdit } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";

export const EntregaRopaListItem = ({ linea }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {linea.descripcion}
      </td>

      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {DateTime.fromISO(linea?.fecha).toLocaleString()}
      </td>

      <td className="px-6 flex text-xl justify-center gap-5 py-4 font-medium text-slate-800 whitespace-nowrap">
        <Link to={`/asociados/entrega-ropa/detalle/${linea.id}`}>
          <BsInfoSquareFill  width={50} height={50} />
        </Link>
        <Link to={`/asociados/entrega-ropa/edit/${linea.id}`}>
          <AiFillEdit width={50} height={50}/>
        </Link>
      </td>
    </tr>
  );
};
