import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { ObjetivosList } from "../../components/objetivos/ObjetivosList";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectObjetivosConRelaciones } from "../../store/selectors/ObjetivosSelectors";

export const Objetivos = () => {

  const objetivos = useSelector(selectObjetivosConRelaciones);

  const { hasLoaded } = useSelector((state) => state.objetivos);
  const { isLoading } = useSelector((state) => state.ui);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasLoaded && objetivos.length === 0) {
    return (
      <Empty
        message={"Aun no hay objetivos registrados, crea uno para continuar"}
        link={"/objetivos/crear"}

      />
    );
  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Objetivos
        </h1>
        <Link
          to={"/objetivos/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear objetivo
        </Link>
      </div>

      <ObjetivosList objetivos={objetivos} />
    </>
  );
};
