import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <nav className="uppercase text-sm text-slate-800  p-10 flex flex-row justify-between gap-6 items-center">

      <Link className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg">inicio</Link>
      <Link className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg" to={"/usuarios"}>usuarios</Link>
      <Link className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg">objetivo</Link>
      <Link className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg" to={"/clientes"}>clientes</Link>
      <Link className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg">servicios</Link>
      <button
        onClick={logout}
        className="bg-gray-600 hover:bg-gray-700 uppercase text-white w-full p-2 cursor-pointer rounded"
      >Cerrar Sesión</button>
    </nav>
  );
};
