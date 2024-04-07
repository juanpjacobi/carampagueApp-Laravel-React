import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClientesList } from "../../components/clientes/ClientesList";
import { useDispatch } from "react-redux";
import { getClientes } from "../../store/slices/thunks/ClientesThunks";

export const Clientes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

 
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

    <ClientesList/>
    </>
  );
};
