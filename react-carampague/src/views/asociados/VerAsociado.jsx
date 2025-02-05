import  { useEffect, useMemo } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import { AsociadoCard } from "../../components/asociados/AsociadoCard";

import { makeSelectAsociadoById } from "../../store/selectors/AsociadosSelectors";
import { NotFound } from "../../components/shared/NotFound";



export const VerAsociado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const asociadoId = parseInt(id, 10);

  const selectAsociado = useMemo(() => makeSelectAsociadoById(asociadoId), [asociadoId]);
  const asociado = useSelector(selectAsociado);



  useEffect(() => {
    if ( !asociado) {
      navigate("/asociados");
    }
  }, [ asociado, navigate]);


  if (!asociado) {
    return <NotFound message={"No se encuentra un asociado con ese id"} />;
  }
  return <AsociadoCard selectedAsociado={asociado} />;
};
