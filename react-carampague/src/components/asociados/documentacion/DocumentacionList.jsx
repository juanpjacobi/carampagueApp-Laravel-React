import React from "react";
import { DocumentacionListItem } from "./DocumentacionListItem";

export const DocumentacionList = ({ documentacion }) => {
  const { lineas } = documentacion;
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-gray-700 mt-2 rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tipo de documentacion
              </th>

              <th scope="col" className="px-6 py-3">
                Fecha solicitud
              </th>
              <th scope="col" className="px-6 py-3">
                Estado de la documentación
              </th>

              <th scope="col" className="px-6 py-3">
                Fecha de entrega
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de vencimiento
              </th>
              <th scope="col" className="px-6 py-3">
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
