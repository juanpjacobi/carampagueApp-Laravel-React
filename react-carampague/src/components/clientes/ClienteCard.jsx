import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ClienteCard = ({ selectedCliente }) => {
  return (
    <div className="max-w-2xl m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {selectedCliente?.razon_social}
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
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Cuit:
            </span>
            {selectedCliente?.cuit_cliente}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Email:
            </span>
            {selectedCliente?.email}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Telefono:
            </span>
            {selectedCliente?.telefono.numero_telefono} (
            {selectedCliente?.telefono.tipo_telefono.nombre_tipo_telefono})
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Email:
            </span>
            {selectedCliente?.email}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {selectedCliente?.estado.nombre_estado}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Condicion frente al iva:
            </span>
            {selectedCliente?.condicion_iva.nombre_condicion_iva}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Direccion
            </span>
            {selectedCliente?.direccion.calle}{" "}
            {selectedCliente?.direccion.numeracion}
            {selectedCliente?.direccion.piso}{" "}
            {selectedCliente?.direccion.departamento}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedCliente?.direccion.barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedCliente?.direccion.localidad.nombre_localidad}
          </p>
        </div>
        <div className="flex flex-col gap-8 text-center">
          <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
            Acciones
          </span>
          <Link
            to={`/clientes/edit/${selectedCliente?.id}`}
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
  );
};
