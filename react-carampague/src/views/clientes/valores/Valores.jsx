import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "../../../components/shared/Empty";
import { ValoresList } from "../../../components/clientes/valores/ValoresList";
import { selectValoresConRelaciones } from "../../../store/selectors/ValoresSelectors";

export const Valores = () => {
  const { id } = useParams();
  const valores  = useSelector(selectValoresConRelaciones);
  const { hasLoaded } = useSelector((state) => state.valores);
  

  if (hasLoaded && valores.length === 0) {
    return (
      <Empty
        message={"Aun no hay valores registrados, crea uno para continuar"}
        link={`/clientes/crear-valor/${id}`}
      />
    );
  }

  const filteredValores = valores.filter(
    (v) => Number(v.cliente_id) === Number(id)
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Valores
        </h1>
        <Link
          to={`/clientes/crear-valor/${id}`}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear valor
        </Link>
      </div>

      <ValoresList valores={filteredValores} />
    </>
  );
};
