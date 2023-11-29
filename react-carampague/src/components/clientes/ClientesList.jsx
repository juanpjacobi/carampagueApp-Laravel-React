import React from 'react'
import { InfoIcon } from '../utilities/icons/InfoIcon'
import { Spinner } from '../utilities/spinners/Spinner'

export const ClientesList = ({clientes, isLoading}) => {
  return (
    <>
      {!isLoading ? (
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
        {clientes?.map((c) => (
          <tr
            key={c.id}
            className="bg-white border-b"
          >
            <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
              <a href="">{c.razon_social}</a>
            </td>
            <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
              {c.estado.nombre_estado}
            </td>
            <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
              {c.email}
            </td>
            <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
              {c.telefono.numero_telefono } ({c.telefono.tipo_telefono.nombre_tipo_telefono}) 
            </td>
            <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
              <InfoIcon id={c.id}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
