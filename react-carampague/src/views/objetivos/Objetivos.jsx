import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { ObjetivosList } from "../../components/objetivos/ObjetivosList";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectObjetivosConRelaciones } from "../../store/selectors/ObjetivosSelectors";
import { FilterSearchBar } from "../../components/shared/search/FilterSearchBar";
import { useEffect, useState } from "react";

export const Objetivos = () => {
  const objetivos = useSelector(selectObjetivosConRelaciones);

  const { hasLoaded } = useSelector((state) => state.objetivos);
  const { isLoading } = useSelector((state) => state.ui);

  // Estados para la búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [filteredObjetivos, setFilteredObjetivos] = useState(objetivos);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = objetivos.filter((obj) => {
      const matchesText =
        obj.nombre && obj.nombre.toLowerCase().includes(lowerSearch);
      const matchesEstado =
        (obj.activo === 1 && filterActive) ||
        (obj.activo !== 1 && filterInactive);
      return matchesText && matchesEstado;
    });
    setFilteredObjetivos(filtered);
  }, [objetivos, search, filterActive, filterInactive]);

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
        <FilterSearchBar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filterActive={filterActive}
          onActiveChange={() => setFilterActive((prev) => !prev)}
          filterInactive={filterInactive}
          onInactiveChange={() => setFilterInactive((prev) => !prev)}
        />
        <Link
          to={"/objetivos/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear objetivo
        </Link>
      </div>

      <ObjetivosList objetivos={filteredObjetivos} />
    </>
  );
};
