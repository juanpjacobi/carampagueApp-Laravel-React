import { EntregaRopaListItem } from "./EntregaRopaListItem";

export const EntregaRopaList = ({ entregaRopa }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-gray-700 mt-2 rounded-md">
        <table className="w-full text-sm text-center">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>

              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {entregaRopa?.map((linea) => (
              <EntregaRopaListItem linea={linea} key={linea.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
