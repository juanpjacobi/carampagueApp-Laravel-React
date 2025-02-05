import { Link, useNavigate, useParams } from 'react-router-dom'
import { ServicioForm } from '../../components/servicios/ServicioForm'
import { makeSelectServicioEnriquecidoById } from '../../store/selectors/ServiciosSelectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ActualizarServicio = () => {

  const { id } = useParams(); 
  const navigate = useNavigate();

  const servicioEnriquecido = useSelector(makeSelectServicioEnriquecidoById(id));

  useEffect(() => {
    if (!servicioEnriquecido) {
      navigate("/servicios");
    }
  }, [servicioEnriquecido, navigate]);

  if (!servicioEnriquecido) return null;

  return (
    <div className="max-w-2xl w-full m-auto">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
        Actualizar servicio
      </h1>
      <Link
        to={"/servicios/"}
        className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
      >
        Atras
      </Link>
    </div>
    <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
      <ServicioForm editMode={true} initialData={servicioEnriquecido}/>
    </div>
  </div>
  )
}
