import React from "react";

export const Userform = () => {
  return (
    <form action="">
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="name">
          Nombre de usuario
        </label>
        <input
          type="text"
          id="name"
          className="mt-2 w-full p-3 bg-gray-200"
          name="name"
          placeholder="Ingresa tu nombre de usuario"
        />
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="mt-2 w-full p-3 bg-gray-200"
          name="password"
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <input
        type="submit"
        value="Crear usuario"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3
    uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
