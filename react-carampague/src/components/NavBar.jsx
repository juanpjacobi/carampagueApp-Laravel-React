import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <nav className="uppercase text-sm text-slate-800  p-10 flex flex-row justify-between gap-6 items-center">
      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/inicio"}
      >
        inicio
      </NavLink>
      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/asociados"}
      >
        asociados
      </NavLink>

      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/usuarios"}
      >
        usuarios
      </NavLink>
      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/objetivos"}
      >
        objetivos
      </NavLink>
      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/clientes"}
      >
        clientes
      </NavLink>
      <NavLink
        className=" hover:bg-sky-800 hover:text-white p-2 rounded-lg"
        to={"/servicios"}
      >
        servicios
      </NavLink>
      <button
        onClick={logout}
        className="bg-gray-600 hover:bg-gray-700 uppercase text-white w-full p-2 cursor-pointer rounded"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};
