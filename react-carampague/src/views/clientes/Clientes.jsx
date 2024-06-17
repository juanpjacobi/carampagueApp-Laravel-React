import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { getClientes } from "../../store/thunks/ClientesThunks";
import { ClientesList } from "../../components/clientes/ClientesList";
import { Spinner } from "../../components/utilities/spinners/Spinner";

export const Clientes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

  const { clientes } = useSelector((state) => state.clientes);
  const { isLoading } = useSelector((state) => state.ui);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
          {clientes.length === 0 ? (
            <Empty message={"Aun no hay clientes registrados, crea uno para continuar"} />
          ) : (
            <ClientesList clientes={clientes} />
          )}
        </>
      )}
    </>
  );
};