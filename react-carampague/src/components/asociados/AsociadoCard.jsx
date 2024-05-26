import { Link } from "react-router-dom";
import {DateTime} from 'luxon';
import { useEffect } from "react";

export const AsociadoCard = ({selectedAsociado}) => {


  return (
    <div className="max-w-2xl m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
        {selectedAsociado?.apellido} {selectedAsociado?.nombre} 
        </h1>

        <Link
          to={"/asociados/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white flex justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-3/4 border-r">
        <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Numero de asociado:
            </span>
            {selectedAsociado?.numero_asociado}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Cuit:
            </span>
            {selectedAsociado?.cuit_asociado}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Telefono:
            </span>
            {selectedAsociado?.telefono?.numero_telefono} (
            {selectedAsociado?.telefono?.tipo_telefono.nombre_tipo_telefono})
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de alta:
            </span>
            { DateTime.fromISO(selectedAsociado?.fecha_alta).toLocaleString()}
    

          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de nacimiento:
            </span>
            { DateTime.fromISO(selectedAsociado?.fecha_nacimiento).toLocaleString()}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {selectedAsociado?.estado?.nombre_estado}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Direccion
            </span>
            {selectedAsociado?.direccion?.calle}
            {selectedAsociado?.direccion?.numeracion}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado civil:
            </span>
            {selectedAsociado?.estado_civil?.nombre}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Piso
            </span>
            {selectedAsociado?.direccion?.piso}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Departamento
            </span>
            {selectedAsociado?.direccion?.departamento}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedAsociado?.direccion?.barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedAsociado?.direccion?.localidad.nombre_localidad}
          </p>
          
        </div>
        {/* <div className="w-1/3 flex flex-col justify-end">
        <img className="w-56 h-56 mb-5 p-4" src="https://res.cloudinary.com/dzwayitls/image/upload/v1716248029/edzgyu83lpq2sqtapwbp.png" alt="" />

        <label class="w-36 flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg  uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 text-center text-xs ">Seleccione una imagen</span>
        <input type='file' class="hidden" />
    </label>
        </div> */}

        <div className="flex flex-col gap-8 text-center">
          <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
            Acciones
          </span>
          <Link
            to={`/asociados/edit/${selectedAsociado?.id}`}
            className="p-1 w-28 text-center bg-teal-600 hover:bg-teal-800 text-white rounded"
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
