import { Link, useNavigate } from 'react-router-dom'
import { DocumentacionForm } from "../../../components/asociados/documentacion/DocumentacionForm";

export const EditarDocumentacion = () => {
  const navigate = useNavigate()

    return (
        <div className="max-w-2xl m-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
            Editar documentacion
          </h1>
          <Link
          onClick={() =>navigate(-1)}
            className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
          >
            Atras
          </Link>
        </div>
        <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
          <DocumentacionForm editMode={true} />
        </div>
      </div>
      )
}
