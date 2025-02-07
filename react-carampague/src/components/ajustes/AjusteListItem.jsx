import { useSelector } from "react-redux";

export const AjusteListItem = ({ linea }) => {
  const { asociados } = useSelector((state) => state.asociados);

  const asociadoObj = asociados.find(
    (a) => Number(a.id) === Number(linea.asociado_id)
  );

  return (
    <tr
      className={
        "p-5 bg-gray-100 flex flex-col md:table-row mb-2 shadow-md shadow-gray-700 "
      }
    >
      <td
        className={
          "p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell"
        }
      >
        <span className="inline-block w-1/3 md:hidden font-bold">Asociado</span>
        {asociadoObj
          ? asociadoObj.nombre + " " + asociadoObj.apellido
          : "global"}
      </td>

      <>
        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
          <span className="inline-block w-1/3 md:hidden font-bold">
            Concepto
          </span>
          {linea.tipo_ajuste.concepto}
        </td>
        <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
          <span className="inline-block w-1/3 md:hidden font-bold">Monto</span>
          {linea.periodo_inicio} a {linea.periodo_fin}{" "}
        </td>
      </>

      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Hora Inicio
        </span>
        {`$ ${linea.monto.toLocaleString()}`}
      </td>
    </tr>
  );
};
