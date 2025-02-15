import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ValorForm } from "../../../components/clientes/valores/ValorForm";
import { NotFound } from "../../../components/shared/NotFound";
import { makeSelectClienteById } from "../../../store/selectors/ClientesSelectors";

export const EditarValor = () => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const cliId = parseInt(clienteId, 10);

  const selectCliente = useMemo(() => makeSelectClienteById(cliId), [cliId]);
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
            <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
            Editar valor</h1>      <ValorForm selectedCliente={cliente} editMode={true}/>
    </div>
  );
};
