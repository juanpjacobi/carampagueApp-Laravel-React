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
    <div className="max-w-2xl w-full m-auto">
      <div className="flex justify-between items-center">
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
      <div className="bg-white flex justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-3/4 border-r">
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
              Valor cliente:
            </span>
            ${selectedObjetivo?.valor.valor_cliente}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Valor Asociado:
            </span>
            ${selectedObjetivo?.valor.valor_vigilador}
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

            {selectedObjetivo?.direccion.piso}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Departamento
            </span>

            {selectedObjetivo?.direccion.departamento}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedObjetivo?.direccion?.barrio.nombre_barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedObjetivo?.direccion?.barrio?.localidad.nombre_localidad}
          </p>
        </div>
        <div className="flex flex-col gap-8 text-center">
          <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
            Acciones
          </span>
          <Link
            to={`/objetivos/edit/${selectedObjetivo?.id}`}
            className="p-1 w-28 text-center bg-teal-600 hover:bg-teal-800 text-white rounded"
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
  );
};
