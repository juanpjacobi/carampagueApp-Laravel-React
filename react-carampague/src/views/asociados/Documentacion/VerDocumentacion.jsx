import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocumentacionCard } from '../../../components/asociados/documentacion/DocumentacionCard'

export const VerDocumentacion = () => {
    const {selectedAsociado} = useSelector((state) => state.asociados);
    const { id } = useParams();
    const linea = selectedAsociado.documentacion.lineas_documentacion.find((l) => l.id.toString() === id);
  return (
    <DocumentacionCard linea={linea}/>
  )
}
