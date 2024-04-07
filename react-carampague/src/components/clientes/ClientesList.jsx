import React from "react";
import { Spinner } from "../utilities/spinners/Spinner";
import { useSelector } from "react-redux";
import { ClienteListItems } from "./ClienteListItems";

export const ClientesList = () => {
  const {clientes} = useSelector((state) => state.clientes);
  const {isLoading} = useSelector((state) => state.clientes);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-gray-700 mt-2 rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-slate-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Ver
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes?.map((cliente) => (
              <ClienteListItems cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
