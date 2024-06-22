import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDocumentacion } from "../../../functions/Documentacion/documentacion";
import { DocumentacionList } from "../../../components/asociados/documentacion/DocumentacionList";
import { Empty } from "../../../components/shared/Empty";

export const DocumentacionAsociado = () => {
  const { id } = useParams();
  const [documentacion, setDocumentacion] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    loadDocumentacion();
  }, []);

  const loadDocumentacion = async () => {
    const { data } = await getDocumentacion(id);

    setDocumentacion(data.documentacion);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1
          className="text-2xl text-sky-700 font-semibold text-center mb-5"
        >
          {documentacion.descripcion}
        </h1>

        <Link
          to={"/asociados/documentacion/crear"}
          className="p-2 text-sm text-center font-bold bg-teal-600 hover:bg-teal-800 text-white rounded"

        >
          Solicitar documentacion
        </Link>
        <Link
          onClick={() =>navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
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
    </>
  );
};
