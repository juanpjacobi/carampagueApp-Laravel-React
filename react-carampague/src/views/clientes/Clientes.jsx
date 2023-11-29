import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClientes } from "../../functions/Cliente/clientes";
import { ClientesList } from "../../components/clientes/ClientesList";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadclientes();
  }, []);

  const loadclientes = async () => {
    const { data } = await getClientes();
    console.log(data);
    setClientes(data.data);
    setIsLoading(false)
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">Clientes</h1>
        <Link
          to={"/clientes/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2
    uppercase font-bold cursor-pointer rounded"
        >
          Crear cliente
        </Link>
      </div>

    <ClientesList clientes={clientes} isLoading={isLoading}/>
    </>
  );
};
