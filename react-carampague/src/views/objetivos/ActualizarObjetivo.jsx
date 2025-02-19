import { Link, useNavigate, useParams } from 'react-router-dom'
import { ObjetivoForm } from '../../components/objetivos/ObjetivoForm'
import { useMemo } from 'react';
import { NotFound } from '../../components/shared/NotFound';
import { makeSelectObjetivoById } from '../../store/selectors/ObjetivosSelectors';
import { useSelector } from 'react-redux';

export const ActualizarObjetivo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const objetivoId = parseInt(id, 10);

  const selectObjetivo = useMemo(() => makeSelectObjetivoById(objetivoId), [objetivoId]);
  const objetivo = useSelector(selectObjetivo);
  if (!objetivo) {
    navigate("/objetivos");
  }

  if (!objetivo) {
    return <NotFound message={"No se encuentra un objetivo con ese id"} />;
  }

  return (
    <div className="max-w-2xl w-full m-auto p-2">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
        Actualizar objetivo
      </h1>
      <Link
        to={"/objetivos/"}
        className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
      >
        Atras
      </Link>
    </div>
    <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
    <ObjetivoForm editMode={true} initialData={objetivo} />
    </div>
  </div>
  )
}
