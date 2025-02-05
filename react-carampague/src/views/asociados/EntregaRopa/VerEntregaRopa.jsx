import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EntregaRopaCard } from '../../../components/asociados/entregaRopa/EntregaRopaCard';
import { useEffect, useMemo } from 'react';
import {  makeSelectLineasEnriquecidasByEntregaRopaId } from '../../../store/selectors/LineasEntregaRopaSelectors';
import { NotFound } from '../../../components/shared/NotFound';

export const VerEntregaRopa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entregaRopaId = parseInt(id, 10);

  const selectLineasEntregaRopa = useMemo(() => makeSelectLineasEnriquecidasByEntregaRopaId(entregaRopaId), [entregaRopaId]);
  const lineas = useSelector(selectLineasEntregaRopa)

  useEffect(() => {
    if ( !lineas) {
      navigate("/asociados");
    }
  }, [ lineas, navigate]);


  if (!lineas) {
    return <NotFound message={"No se encuentra un cliente con ese id"} />;
  }

  return (
    <EntregaRopaCard lineas={lineas}/>
  )
}
