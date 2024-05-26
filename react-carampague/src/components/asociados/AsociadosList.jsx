import React from "react";
import { Spinner } from "../utilities/spinners/Spinner";
import { useSelector } from "react-redux";
import { AsociadoListItem } from "./AsociadoListItem";
import { Empty } from "../Empty";

export const AsociadoList = ({asociados}) => {
  const {isLoading} = useSelector((state) => state.ui);

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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Numero
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
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
            {asociados?.map((asociado) => (
              <AsociadoListItem asociado={asociado} key={asociado.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
