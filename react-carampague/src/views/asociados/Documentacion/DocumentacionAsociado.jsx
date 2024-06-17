import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocumentacion } from "../../../functions/Documentacion/documentacion";
import { DocumentacionList } from "../../../components/asociados/documentacion/DocumentacionList";
import { Empty } from "../../../components/shared/Empty";

export const DocumentacionAsociado = () => {
  const { id } = useParams();
  const [documentacion, setDocumentacion] = useState({});
  useEffect(() => {
    loadDocumentacion();
  }, []);

  const loadDocumentacion = async () => {
    const { data } = await getDocumentacion(id);

    setDocumentacion(data.documentacion);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1
          className="text-2xl text-sky-700 font-semibold text-center mb-5"
        >
          {documentacion.descripcion}
        </h1>
        <Link
          to={"/asociados/documentacion/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2
    uppercase font-bold cursor-pointer rounded"
        >
          Solicitar documentacion
        </Link>
      </div>
      {documentacion?.lineas?.length > 0 ? (
        <DocumentacionList documentacion={documentacion} />
      ) : (
        <Empty
          message={
            "No se ha solicitado documentacion para este asociado todavia"
          }
        />
      )}
    </div>
  );
};
