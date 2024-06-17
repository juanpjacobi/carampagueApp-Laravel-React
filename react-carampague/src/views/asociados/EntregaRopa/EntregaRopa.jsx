import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EntregaRopaList } from "../../../components/asociados/entregaRopa/EntregaRopaList";

export const EntregaRopa = () => {
  const { selectedAsociado } = useSelector((state) => state.asociados);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1
          className="text-3xl underline underline-offset-8
       text-sky-700 font-semibold text-center mb-5"
        >
          Ropa entregada a: {selectedAsociado.nombre}{" "}
          {selectedAsociado.apellido}
        </h1>
        <Link
          to={"/asociados/entrega-ropa/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2
  uppercase font-bold cursor-pointer rounded"
        >
          Agregar entrega
        </Link>
      </div>
      <EntregaRopaList entregaRopa={selectedAsociado.entrega_ropa} />
    </>
  );
};
