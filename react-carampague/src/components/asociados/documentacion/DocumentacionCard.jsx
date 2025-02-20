// src/components/asociados/documentacion/DocumentacionCard.js
import React from "react";
import { DateTime } from "luxon";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const DocumentacionCard = ({ linea }) => {
  const navigate = useNavigate();

  // Extraemos los arrays de tipos y estados de documentación del store
  const tiposDocumentacion = useSelector((state) => state.tiposDocumentacion.tiposDocumentacion);
  const estadosDocumentacion = useSelector((state) => state.estadosDocumentacion.estadosDocumentacion);

  // Buscamos el objeto correspondiente a los IDs de la línea
  const tipoDoc = tiposDocumentacion.find(
    (t) => Number(t.id) === Number(linea.tipo_documentacion_id)
  );
  const estadoDoc = estadosDocumentacion.find(
    (e) => Number(e.id) === Number(linea.estado_documentacion_id)
  );

  return (
    <div className="w-full max-w-2xl m-auto p-2">
      <div className="flex justify-between items-center">
        <h1 className="md:text-2xl text-lg underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {tipoDoc ? tipoDoc.nombre_tipo_documentacion : "Sin tipo"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atrás
        </button>
      </div>
      <div className="bg-white flex flex-col md:flex-row justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
      <div className="w-full md:w-3/4 md:border-r">
      <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">Fecha de solicitud:</span>
            {linea.fecha_solicitud ? DateTime.fromISO(linea.fecha_solicitud).toLocaleString() : "---"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">Estado:</span>
            {estadoDoc ? estadoDoc.nombre_estado_documentacion : "Sin estado"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">Fecha de entrega:</span>
            {linea.fecha_entrega ? DateTime.fromISO(linea.fecha_entrega).toLocaleString() : "---"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">Fecha de vencimiento:</span>
            {linea.fecha_vencimiento ? DateTime.fromISO(linea.fecha_vencimiento).toLocaleString() : "---"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">Observaciones:</span>
            {linea.observaciones || "Sin observaciones"}
          </p>
        </div>
        <div className="flex flex-col text-center border-t-2 md:border-none">
          <span className="text-md  mr-2 font-bold text-sky-800 uppercase border-b-2">
            Acciones</span>
          <div className="flex flex-col h-full gap-2 md:justify-around">
            <Link
              to={`/asociados/documentacion/edit/${linea.id}`}
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
