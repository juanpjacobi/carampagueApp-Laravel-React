import { EntregaRopaListItem } from "./EntregaRopaListItem";

export const EntregaRopaList = ({ entregaRopa }) => {
  return (
    <>
      <div className="flex flex-col shadow-2xl md:shadow-gray-500 mt-2">
        <table className="w-full text-sm text-left min-w-full border-collapse md:table">
          <thead className="text-sm  text-slate-700 uppercase bg-slate-200 block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Descripcion
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Fecha
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group ">
            {entregaRopa?.map((linea) => (
              <EntregaRopaListItem linea={linea} key={linea.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
