import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EntregaRopaList } from "../../../components/asociados/entregaRopa/EntregaRopaList";

export const EntregaRopa = () => {
  const { selectedAsociado } = useSelector((state) => state.asociados);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1
          className="text-2xl underline underline-offset-8
       text-sky-700 font-semibold text-center mb-5"
        >
          Ropa entregada a: {selectedAsociado.nombre}{" "}
          {selectedAsociado.apellido}
        </h1>
        <Link
          to={"/asociados/entrega-ropa/crear"}
          className="p-2 text-sm text-center font-bold bg-rose-600 hover:bg-rose-950 text-white rounded"

        >
          Agregar entrega
        </Link>
        <Link
          onClick={() =>navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <EntregaRopaList entregaRopa={selectedAsociado.entrega_ropa} />
    </>
  );
};
