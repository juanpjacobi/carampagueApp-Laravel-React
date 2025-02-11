import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CarpetasMedicasListItem = ({ carpeta }) => {
  const navigate = useNavigate();
  const { asociados } = useSelector((state) => state.asociados);

  const asociado = asociados.find(
    (a) => Number(a.id) === Number(carpeta.asociado_id)
  );

  const backendHost = "http://localhost:8080";

  const handleViewPDF = () => {
    window.open(`${backendHost}${carpeta.pdf_url}`, "_blank");
  };

  return (
    <tr className="p-5 bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">carpeta</span>
        #{carpeta.id}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Asociado</span>
        {asociado ? `${asociado.nombre} ${asociado.apellido}` : "Sin Datos"}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Periodo</span>
        {carpeta.periodo}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Periodo</span>
        $ {carpeta.monto.toLocaleString()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">PDF</span>
        <button
          onClick={handleViewPDF}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
        >
          Ver PDF
        </button>
      </td>
    </tr>
  );
};
