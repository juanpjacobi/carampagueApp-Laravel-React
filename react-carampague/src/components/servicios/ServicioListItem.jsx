import { useSelector } from "react-redux";
import { InfoIcon } from "../utilities/icons/InfoIcon";
export const ServicioListItem = ({ servicio }) => {
  const {objetivos} = useSelector((state) => state.objetivos);
  const objetivo = objetivos.find(o => o.id === parseInt(servicio.objetivo_id));

  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700  flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none md:text-start text-end md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold text-start">Servicio</span>
        {servicio.nombre.toUpperCase()}
      </td>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none md:text-start text-sm text-end md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold text-start">Descripcion</span>
        {servicio.descripcion}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell ">
        <span className="inline-block w-1/3 md:hidden font-bold ">
          Objetivo
        </span>
        {objetivo.nombre.toUpperCase()}
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Ver</span>
        <InfoIcon tipo="servicios" id={servicio.id} />
      </td>
    </tr>
  );
};
