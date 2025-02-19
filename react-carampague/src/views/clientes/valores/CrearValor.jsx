import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ValorForm } from "../../../components/clientes/valores/ValorForm";
import { NotFound } from "../../../components/shared/NotFound";
import { makeSelectClienteById } from "../../../store/selectors/ClientesSelectors";

export const CrearValor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteId = parseInt(id, 10);

  const selectCliente = useMemo(
    () => makeSelectClienteById(clienteId),
    [clienteId]
  );
  const cliente = useSelector(selectCliente);

  useEffect(() => {
    if (!cliente) {
      navigate("/clientes", { replace: true });
    }
  }, [cliente, navigate]);

  if (!cliente) {
    return <NotFound message={"No se encuentra un cliente con ese id"} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
          Crear valor
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </button>
      </div>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <ValorForm selectedCliente={cliente} editMode={false} />
      </div>
    </div>
  );
};
