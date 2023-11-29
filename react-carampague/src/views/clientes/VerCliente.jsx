import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCliente } from "../../functions/Cliente/clientes";
import { Spinner } from "../../components/utilities/spinners/Spinner";

export const VerCliente = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    loadCliente();
  }, []);

  const loadCliente = async () => {
    const { data } = await getCliente(id);
    setCliente(data.data);
    setIsLoading(false);
  };
  return (
    <>
      {!isLoading ? (
        <div className="max-w-2xl m-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
              {cliente.razon_social}
            </h1>

            <Link
              to={"/clientes/"}
              className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
            >
              Atras
            </Link>
          </div>
          <div className="bg-white flex justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
            <div className="w-3/4 border-r">
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Cuit:
                </span>
                {cliente.cuit_cliente}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Email:
                </span>
                {cliente.email}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Telefono:
                </span>
                {cliente.telefono.numero_telefono} (
                {cliente.telefono.tipo_telefono.nombre_tipo_telefono})
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Email:
                </span>
                {cliente.email}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Estado:
                </span>
                {cliente.estado.nombre_estado}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Condicion frente al iva:
                </span>
                {cliente.condicion_iva.nombre_condicion_iva}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Direccion
                </span>
                {cliente.direccion.calle} {cliente.direccion.numeracion}{" "}
                {cliente.direccion.piso} {cliente.direccion.departamento}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Barrio
                </span>
                {cliente.direccion.barrio}
              </p>
              <p className="text-sm mb-2 text-slate-800">
                <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Localidad
                </span>
                {cliente.direccion.localidad.nombre_localidad}
              </p>
            </div>
            <div className="flex flex-col gap-8 text-center">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Acciones
                </span>
            <Link
              to={"/clientes/"}
              className="p-1 w-28 text-center bg-green-600 hover:bg-green-800 text-white rounded"
            >
              Editar
            </Link>
            <Link
              to={"/clientes/"}
              className="p-1 w-28 text-center bg-red-600 hover:bg-red-950 text-white rounded"
            >
              Eliminar
            </Link>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
