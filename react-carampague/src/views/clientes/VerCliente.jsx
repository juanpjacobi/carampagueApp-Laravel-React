import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClienteCard } from "../../components/clientes/ClienteCard";
import { makeSelectClienteById } from "../../store/selectors/ClientesSelectors";
import { NotFound } from "../../components/shared/NotFound";

export const VerCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteId = parseInt(id, 10);

  const selectCliente = useMemo(() => makeSelectClienteById(clienteId), [clienteId]);
  const cliente = useSelector(selectCliente);



  useEffect(() => {
    if ( !cliente) {
      navigate("/clientes");
    }
  }, [ cliente, navigate]);


  if (!cliente) {
    return <NotFound message={"No se encuentra un cliente con ese id"} />;
  }

  return <ClienteCard selectedCliente={cliente} />;
};
