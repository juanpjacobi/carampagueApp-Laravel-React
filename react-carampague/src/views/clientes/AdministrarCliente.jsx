import { useSelector } from "react-redux";
import { ValorForm } from "../../components/clientes/valores/ValorForm";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { NotFound } from "../../components/shared/NotFound";
import { makeSelectClienteById } from "../../store/selectors/ClientesSelectors";

export const AdministrarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteId = parseInt(id, 10);

  const selectCliente = useMemo(() => makeSelectClienteById(clienteId), [clienteId]);
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
      <h1>Administrar cliente</h1>
      <ValorForm selectedCliente={cliente} editMode={false}/>
    </div>
  );
};
