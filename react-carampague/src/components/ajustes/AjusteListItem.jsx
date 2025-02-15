import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { deleteAjuste } from "../../store/thunks/AjustesThunks";

export const AjusteListItem = ({ linea, onEdit }) => {
  const { asociados } = useSelector((state) => state.asociados);
  const dispatch = useDispatch();

  const asociadoObj = asociados.find(
    (a) => Number(a.id) === Number(linea.asociado_id)
  );

  const handleEliminarLinea = () => {
    dispatch(deleteAjuste(linea.id));
  };
  return (
    <tr className="bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700">
      {/* Columna: Asociado */}
      <td className="p-2 border-b border-slate-300 md:border-none md:text-left md:table-cell">
        <div className="grid grid-cols-2 items-center gap-2 w-full md:flex md:items-center">
          <span className="font-bold md:hidden">Asociado:</span>
          <span className="md:w-[150px] inline-block text-right md:text-left">
            {asociadoObj
              ? `${asociadoObj.nombre} ${asociadoObj.apellido}`
              : "global"}
          </span>
        </div>
      </td>

      {/* Columna: Concepto */}
      <td className="p-2 border-b border-slate-300 md:border-none text-left md:table-cell">
        <div className="grid grid-cols-2 items-center gap-2 w-full md:flex md:items-center">
          <span className="font-bold md:hidden">Concepto:</span>
          <span className="md:w-[150px] inline-block text-right md:text-left">
            {linea.tipo_ajuste.concepto}
          </span>
        </div>
      </td>

      {/* Columna: Periodo */}
      <td className="p-2 border-b border-slate-300 md:border-none text-left md:table-cell">
        <div className="grid grid-cols-2 items-center gap-2 w-full md:flex md:items-center">
          <span className="font-bold md:hidden">Periodo:</span>
          <span className="md:w-[150px] inline-block text-right md:text-left">
            {linea.periodo_inicio} a {linea.periodo_fin}
          </span>
        </div>
      </td>

      {/* Columna: Monto */}
      <td className="p-2 border-b border-slate-300 md:border-none text-left md:table-cell">
        <div className="grid grid-cols-2 items-center gap-2 w-full md:flex md:items-center">
          <span className="font-bold md:hidden">Monto:</span>
          <span className="md:w-[150px] inline-block text-right md:text-left">
            {`$ ${linea.monto.toLocaleString()}`}
          </span>
        </div>
      </td>

      {/* Columna: Acciones */}
      <td className="p-2 text-left md:table-cell">
        <div className="grid grid-cols-2 items-center gap-2 w-full md:flex md:items-center">
          <span className="font-bold md:hidden">Acciones:</span>
          <div className="flex items-center gap-3 justify-end md:justify-start">
            <button
              onClick={() => onEdit(linea)}
              className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-800"
            >
              <AiFillEdit size={20} />
            </button>
            <button
              onClick={handleEliminarLinea}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-800"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
