import React from 'react'
import { Link } from 'react-router-dom'

export const Users = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
    <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">Usuarios</h1>
    <Link
      to={"/usuarios/crear"}
      className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2
uppercase font-bold cursor-pointer rounded"
    >
      Crear usuario
    </Link>
  </div>
  )
}
