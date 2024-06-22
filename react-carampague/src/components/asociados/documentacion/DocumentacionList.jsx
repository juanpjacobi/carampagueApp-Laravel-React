import React from "react";
import { DocumentacionListItem } from "./DocumentacionListItem";

export const DocumentacionList = ({ documentacion }) => {
  const { lineas } = documentacion;
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
                Tipo de documentacion
              </th>

              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Fecha solicitud
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Estado de la documentación
              </th>

              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Fecha de entrega
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Fecha de vencimiento
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Ver
              </th>
            </tr>
          </thead>
          <tbody>
            {lineas?.map((linea) => (
              <DocumentacionListItem linea={linea} key={linea.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
