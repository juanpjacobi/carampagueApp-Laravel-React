import { ServicioListItem } from "./ServicioListItem";

export const ServiciosList = ({ servicios }) => {
  return (
    <>
      <div className="flex flex-col shadow-2xl md:shadow-gray-500 mt-2">
      <table className="w-full text-sm text-left min-w-full border-collapse block md:table">
      <thead className="text-sm  text-slate-700 uppercase bg-slate-200 block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Servicio
              </th>
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
                Objetivo
              </th>

              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Ver
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group ">
            {servicios?.map((servicio) => (
              <ServicioListItem servicio={servicio} key={servicio.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
