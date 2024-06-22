import { useNavigate } from "react-router-dom";
import { EntregaRopaForm } from "../../../components/asociados/entregaRopa/EntregaRopaForm";

export const RegistrarEntregaRopa = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-3/5 m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
          Registrar entrega de ropa
        </h1>
        <button
          onClick={() => navigate(-1)}
          //   to={"/asociados/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </button>
      </div>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <EntregaRopaForm editMode={false} />
      </div>
    </div>
  );
};
