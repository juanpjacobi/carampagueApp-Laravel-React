import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { ObjetivosList } from "../../components/objetivos/ObjetivosList";
import { getObjetivos } from "../../store/thunks/ObjetivosThunks";
import { Spinner } from "../../components/utilities/spinners/Spinner";

export const Objetivos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getObjetivos());
  }, [dispatch]);

  const { objetivos } = useSelector((state) => state.objetivos);
  const { isLoading } = useSelector((state) => state.ui);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
          {objetivos.length === 0 ? (
            <Empty
              message={
                "Aun no hay objetivos registrados, crea uno para continuar"
              }
            />
          ) : (
            <ObjetivosList objetivos={objetivos} />
          )}
        </>
      )}
    </>
  );
};
