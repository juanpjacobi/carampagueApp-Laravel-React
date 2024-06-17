import { Link } from "react-router-dom";
import { AsociadoForm } from "../../components/asociados/AsociadoForm";

export const CrearAsociado = () => {
  return (
    <div className="w-full md:w-3/5 m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
          Crear nuevo asociado
        </h1>
        <Link
          to={"/asociados/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <AsociadoForm editMode={false}/>
      </div>
    </div>
  );
};
