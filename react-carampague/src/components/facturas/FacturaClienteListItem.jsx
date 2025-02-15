
import { useSelector } from "react-redux";

export const FacturaClienteListItem = ({ factura }) => {
  const { objetivos } = useSelector((state) => state.objetivos);

  const objetivo = objetivos.find(
    (o) => Number(o.id) === Number(factura.objetivo_id)
  );

  const backendHost = "http://localhost:8080";

  const handleViewPDF = () => {
    window.open(`${backendHost}${factura.pdf_url}`, "_blank");
  };

  return (
    <tr className="p-5 bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">factura</span>
        #{factura.id}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Objetivo</span>
        {objetivo ? `${objetivo.nombre}` : "Sin Datos"}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Periodo</span>
        {factura.periodo}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Monto</span>
        $ {factura.total.toLocaleString()}
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
