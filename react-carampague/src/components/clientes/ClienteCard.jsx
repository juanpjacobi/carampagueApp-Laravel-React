import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleClienteActivo } from "../../store/thunks/ClientesThunks";

export const ClienteCard = ({ selectedCliente }) => {
  const dispatch = useDispatch();

  const [activo, setActivo] = useState(selectedCliente?.activo);

  const handleToggleActivo = async () => {
    await dispatch(toggleClienteActivo(selectedCliente.id, setActivo));
  };

  return (
    <div className="max-w-2xl p-5 w-full m-auto">
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
      <div className="bg-white flex flex-col md:flex-row justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-full md:w-3/4 md:border-r">
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
            {selectedCliente?.telefono?.numero_telefono} (
            {selectedCliente?.tipo_telefono?.nombre})
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {selectedCliente?.activo ? "Activo" : "Inactivo"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Condicion frente al iva:
            </span>
            {selectedCliente?.condicionIva?.nombre}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Direccion
            </span>
            {selectedCliente?.direccion?.calle}{" "}
            {selectedCliente?.direccion?.numeracion}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Piso
            </span>
            {selectedCliente.piso ? selectedCliente?.direccion?.piso : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Departamento
            </span>
            {selectedCliente.departamento ? selectedCliente?.direccion?.departamento : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedCliente?.barrio?.nombre_barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedCliente?.localidad?.nombre}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Provincia
            </span>
            {selectedCliente?.provincia?.nombre}
          </p>
        </div>
        <div className="flex flex-col text-center border-t-2 md:border-none">
        <span className="text-md  mr-2 font-bold text-sky-800 uppercase border-b-2">
            Acciones
          </span>
          <div className="flex flex-col h-full gap-2 md:justify-around">
            <Link
              to={`/clientes/edit/${selectedCliente?.id}`}
              className="p-2 w-full text-sm text-center bg-blue-600 hover:bg-blue-950 text-white rounded"
            >
              Editar
            </Link>
            <Link
              to={`/clientes/valores/${selectedCliente?.id}`}
              className="p-2 w-full text-sm text-center bg-teal-600 hover:bg-teal-950 text-white rounded"
            >
              Valores
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
