import { ObjetivoListItem } from "./ObjetivoListItem";

export const ObjetivosList = ({ objetivos }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-gray-700 mt-2 rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre objetivo
              </th>
              <th scope="col" className="px-6 py-3 hidden lg:visible">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 ">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Direccion
              </th>
              <th scope="col" className="px-6 py-3">
                Ver
              </th>
            </tr>
          </thead>
          <tbody>
            {objetivos?.map((objetivo) => (
              <ObjetivoListItem objetivo={objetivo} key={objetivo.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
