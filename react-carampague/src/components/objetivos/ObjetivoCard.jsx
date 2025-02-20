import { useState } from "react";
import { Link } from "react-router-dom";
import { toggleObjetivoActivo } from "../../store/thunks/ObjetivosThunks";
import { useDispatch } from "react-redux";

export const ObjetivoCard = ({ selectedObjetivo }) => {
  const dispatch = useDispatch();

  const [activo, setActivo] = useState(selectedObjetivo?.activo);

  const handleToggleActivo = async () => {
    await dispatch(toggleObjetivoActivo(selectedObjetivo.id, setActivo));
  };
  return (
    <div className="max-w-2xl p-5 w-full m-auto">
      <div className="flex  gap-2 justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {selectedObjetivo?.nombre}
        </h1>

        <Link
          to={"/objetivos/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white flex flex-col md:flex-row justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-full md:w-3/4 md:border-r">
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Cliente:
            </span>
            {selectedObjetivo?.cliente.razon_social}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {selectedObjetivo?.activo ? "Activo" : "Inactivo"}
          </p>

      
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Direccion
            </span>
            {selectedObjetivo?.direccion?.calle}{" "}
            {selectedObjetivo?.direccion?.numeracion}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Piso
            </span>
            {selectedObjetivo.piso ? selectedObjetivo?.direccion?.piso : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Departamento
            </span>
            {selectedObjetivo.departamento ? selectedObjetivo?.direccion?.departamento : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedObjetivo?.barrio.nombre_barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedObjetivo?.localidad.nombre}
          </p>
        </div>
        <div className="flex flex-col text-center border-t-2 md:border-none">
        <span className="text-md  mr-2 font-bold text-sky-800 uppercase border-b-2">
        Acciones
          </span>
          <div className="flex flex-col h-full gap-2 md:justify-around">
            <Link
              to={`/objetivos/edit/${selectedObjetivo?.id}`}
              className="p-2 w-full text-sm text-center bg-blue-600 hover:bg-blue-950 text-white rounded"
            >
              Editar
            </Link>
            <button
              onClick={handleToggleActivo}
              className={`p-2 w-full text-sm text-center ${
                activo
                  ? "bg-red-600 hover:bg-red-950"
                  : "bg-green-600 hover:bg-green-950"
              } text-white rounded`}
            >
              {activo ? "Inactivar" : "Activar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
