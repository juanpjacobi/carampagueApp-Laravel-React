import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { ClientesList } from "../../components/clientes/ClientesList";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectClientesConRelaciones } from "../../store/selectors/ClientesSelectors";

export const Clientes = () => {
  const clientes = useSelector(selectClientesConRelaciones);

  const {  hasLoaded } = useSelector((state) => state.clientes);
  const { isLoading } = useSelector((state) => state.ui);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasLoaded && clientes.length === 0) {
    return (
      <Empty
        message={"Aun no hay clientes registrados, crea uno para continuar"}
        link={"/clientes/crear"}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Clientes
        </h1>
        <Link
          to={"/clientes/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear cliente
        </Link>
      </div>

      <ClientesList clientes={clientes} />
    </>
  );
};
