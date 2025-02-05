import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EntregaRopaList } from "../../../components/asociados/entregaRopa/EntregaRopaList";
import { Empty } from "../../../components/shared/Empty";
import {  makeSelectEntregasRopaByAsociado } from "../../../store/selectors/EntregaRopaSelectors";

export const EntregaRopa = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const selectEntregasByAsociado = makeSelectEntregasRopaByAsociado(id);
  const entregaRopa = useSelector(selectEntregasByAsociado);
  const {  hasLoaded } = useSelector((state) => state.entregasRopa) 


  if (hasLoaded && entregaRopa.length === 0) {
    return (
      <Empty
        message={"Aun no hay asociados registrados, crea uno para continuar"}
        link={`/asociados/${id}/entrega-ropa/crear`}      />
    );
  }
    
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1
          className="text-2xl underline underline-offset-8
       text-sky-700 font-semibold text-center mb-5"
        >
          Ropa entregada
        </h1>
        <Link
          to={`/asociados/${id}/entrega-ropa/crear`}   
          className="p-2 text-sm text-center font-bold bg-rose-600 hover:bg-rose-950 text-white rounded"

        >
          Agregar entrega
        </Link>
        <Link
          onClick={() =>navigate(-1)}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <EntregaRopaList entregaRopa={entregaRopa} />
 
    </>
  );
};
