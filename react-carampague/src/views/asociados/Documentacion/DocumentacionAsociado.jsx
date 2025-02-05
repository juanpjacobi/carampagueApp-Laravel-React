import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Empty } from "../../../components/shared/Empty";
import { DocumentacionList } from "../../../components/asociados/documentacion/DocumentacionList";
import { makeSelectDocumentacionConLineasByDocumentacionId } from "../../../store/selectors/DocumentacionSelectors";
import { makeSelectAsociadoById } from "../../../store/selectors/AsociadosSelectors"; // Asegúrate de tener este selector

export const DocumentacionAsociado = () => {
  const { id } = useParams(); // id del asociado
  const navigate = useNavigate();

  // Obtén el asociado a partir del id (esto se hace si tienes el slice de asociados normalizado)
  const asociado = useSelector(makeSelectAsociadoById(id));
  
  // Si no tienes selectedAsociado, usa el resultado del selector anterior.
  // A partir del asociado, extrae el documentacion_id.
  const documentacionId = asociado ? asociado.documentacion_id : null;
  
  // Usa el selector enriquecido para obtener la documentación completa
  const documentacion = useSelector(
    makeSelectDocumentacionConLineasByDocumentacionId(documentacionId)
  );
  console.log(documentacion)
  useEffect(() => {
    if (!documentacion) {
      navigate("/asociados", { replace: true });
    }
  }, [documentacion, navigate]);

  if (!documentacion) return null;
  
  if (!documentacion.lineas_documentacion || documentacion.lineas_documentacion.length === 0) {
    return (
      <Empty
        message="No se ha solicitado documentación para este asociado todavía"
        link={`/asociados/${id}/documentacion/crear`}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1 className="text-2xl text-sky-700 font-semibold text-center mb-5">
          {documentacion.descripcion}
        </h1>
        <Link
          to={`/asociados/${id}/documentacion/crear`}
          className="p-2 text-sm text-center font-bold bg-teal-600 hover:bg-teal-800 text-white rounded"
        >
          Solicitar documentación
        </Link>
        <Link
          to={`/asociados/${id}`}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atrás
        </Link>
      </div>
      <DocumentacionList documentacion={documentacion} />
    </>
  );
};
