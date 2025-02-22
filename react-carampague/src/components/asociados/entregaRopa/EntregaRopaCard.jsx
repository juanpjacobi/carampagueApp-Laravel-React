import { useNavigate } from "react-router-dom";

export const EntregaRopaCard = ({ lineas }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl m-auto p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          Entrega Ropa
        </h1>
        <button
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Atras
        </button>
      </div>
      <div className="bg-white flex justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-full">
          <table className="w-full text-sm text-center">
            <thead className="text-sm text-slate-700 uppercase bg-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Prenda
                </th>
                <th scope="col" className="px-6 py-3">
                  Talle
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {lineas.map((l) => (
                <tr className="bg-white border-b" key={l.id}>
                  <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                    {l.prenda.tipo_prenda.nombre_tipo_prenda}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                    {l.prenda.talle.nombre_talle}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                    {l.cantidad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
