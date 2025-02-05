import { Link, useNavigate, useParams } from "react-router-dom";
import { ClienteForm } from "../../components/clientes/ClienteForm";
import { makeSelectClienteById } from "../../store/selectors/ClientesSelectors";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const ActualizarCliente = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const clienteId = parseInt(id, 10);

  const selectCliente = useMemo(() => makeSelectClienteById(clienteId), [clienteId]);
  const cliente = useSelector(selectCliente);
  if (!cliente) {
    navigate("/clientes");
  }

  if (!cliente) {
    return <NotFound message={"No se encuentra un cliente con ese id"} />;
  }
  return (
    <div className="max-w-2xl w-full m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
          Actualizar cliente
        </h1>
        <Link
          to={"/clientes/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
      <ClienteForm editMode={true} initialData={cliente} />
      </div>
    </div>
  );
};
