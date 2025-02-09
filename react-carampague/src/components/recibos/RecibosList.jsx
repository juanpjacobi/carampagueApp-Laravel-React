// src/components/recibos/RecibosList.jsx
import React from "react";
import { RecibosListItem } from "./RecibosListItem";

export const RecibosList = ({ recibos }) => {
  return (
    <div className="flex flex-col mt-2 space-y-4">
      <div className="flex flex-col shadow-md md:shadow-gray-500">
        <table className="w-full text-sm text-left min-w-full border-collapse block md:table">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200 block md:table-header-group">
            <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="p-2 font-bold md:border md:border-gray-500 block md:table-cell">
                Recibo
              </th>
              <th className="p-2 font-bold md:border md:border-gray-500 block md:table-cell">
                Asociado
              </th>
              <th className="p-2 font-bold md:border md:border-gray-500 block md:table-cell">
                Periodo
              </th>
              <th className="p-2 font-bold md:border md:border-gray-500 block md:table-cell">
                PDF
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {recibos?.map((recibo) => (
              <RecibosListItem key={recibo.id} recibo={recibo} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
