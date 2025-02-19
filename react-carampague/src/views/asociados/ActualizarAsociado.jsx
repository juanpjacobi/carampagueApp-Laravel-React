import { Link, useNavigate, useParams } from 'react-router-dom'
import { AsociadoForm } from '../../components/asociados/AsociadoForm'
import { makeSelectAsociadoById } from '../../store/selectors/AsociadosSelectors';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { NotFound } from '../../components/shared/NotFound';

export const ActualizarAsociado = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const asociadoId = parseInt(id, 10);

  const selectAsociado = useMemo(() => makeSelectAsociadoById(asociadoId), [asociadoId]);
  const asociado = useSelector(selectAsociado);
  if (!asociado) {
    navigate("/asociados");
  }

  if (!asociado) {
    return <NotFound message={"No se encuentra un asociado con ese id"} />;
  }

  return (
    <div className="max-w-2xl w-full m-auto p-2">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
        Actualizar asociado
      </h1>
      <Link
        to={"/asociados/"}
        className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
      >
        Atras
      </Link>
    </div>
    <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
      <AsociadoForm editMode={true} initialData={asociado}/>
    </div>
  </div>
  )
}
