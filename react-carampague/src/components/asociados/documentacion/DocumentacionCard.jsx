import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

export const DocumentacionCard = ({ linea, selectedAsociado }) => {
  const navigate = useNavigate()
  return (
    <div className="max-w-2xl m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {linea?.tipo_documentacion.nombre_tipo_documentacion}
        </h1>

        <Link
          onClick={() =>navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white flex justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-3/4 border-r">
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de solicitud
            </span>
            {DateTime.fromISO(linea?.fecha_solicitud).toLocaleString()}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {linea?.estado_documentacion.nombre_estado_documentacion}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de entrega:
            </span>
            {DateTime.fromISO(linea?.fecha_entrega).toLocaleString()}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de vencimiento:
            </span>
            {DateTime.fromISO(linea?.fecha_vencimiento).toLocaleString()}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Observaciones:
            </span>
            {linea?.observaciones}
          </p>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-md mr-2 font-bold text-sky-800 uppercase border-b-2">
            Acciones
          </span>
          <div className="flex flex-col h-full justify-around">
            <Link
              to={`/asociados/documentacion/edit/${linea?.id}`}
              className="p-2 w-full text-sm text-center bg-teal-600 hover:bg-teal-800 text-white rounded"
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
