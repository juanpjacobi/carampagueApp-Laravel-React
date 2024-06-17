import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EntregaRopaCard } from '../../../components/asociados/entregaRopa/EntregaRopaCard';

export const VerEntregaRopa = () => {
    const {selectedAsociado} = useSelector((state) => state.asociados);
    const { id } = useParams();
    const entrega = selectedAsociado.entrega_ropa.find((l) => l.id.toString() === id);
  return (
    <EntregaRopaCard entrega={entrega} selectedAsociado={selectedAsociado}/>
  )
}
