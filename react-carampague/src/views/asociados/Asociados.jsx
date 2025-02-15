import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsociadoList } from "../../components/asociados/AsociadosList";
import { Empty } from "../../components/shared/Empty";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectAsociadosConRelaciones } from "../../store/selectors/AsociadosSelectors";

export const Asociados = () => {

  const asociados = useSelector(selectAsociadosConRelaciones);

  const {  hasLoaded } = useSelector((state) => state.asociados);
  const { isLoading } = useSelector((state) => state.ui);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasLoaded && asociados.length === 0) {
    return (
      <Empty
        message={"Aun no hay asociados registrados, crea uno para continuar"}
        link={"/asociados/crear"}
      />
    );
  }

  return (
    <>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
              Asociados
            </h1>
            <Link
              to={"/asociados/crear"}
              className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
            >
              Crear asociado
            </Link>
          </div>

            <AsociadoList asociados={asociados} />
        </>
  );
};