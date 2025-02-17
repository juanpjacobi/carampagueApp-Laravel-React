import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsociadoList } from "../../components/asociados/AsociadosList";
import { Empty } from "../../components/shared/Empty";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectAsociadosConRelaciones } from "../../store/selectors/AsociadosSelectors";
import { useEffect, useState } from "react";
import { FilterSearchBar } from "../../components/shared/search/FilterSearchBar";

export const Asociados = () => {
  const asociados = useSelector(selectAsociadosConRelaciones);

  const { hasLoaded } = useSelector((state) => state.asociados);
  const { isLoading } = useSelector((state) => state.ui);

  // Estados para búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [filteredAsociados, setFilteredAsociados] = useState(asociados);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = asociados.filter((a) => {
      const matchesText = Object.values(a).some((val) => {
        if (typeof val === "string") {
          return val.toLowerCase().includes(lowerSearch);
        }
        return false;
      });
      const matchesNumero =
        a.numero_asociado &&
        a.numero_asociado.toString().includes(search);
      
      const matchesSearch = matchesText || matchesNumero;
      
      const matchesEstado =
        (a.activo === 1 && filterActive) || (a.activo !== 1 && filterInactive);
        
      return matchesSearch && matchesEstado;
    });
    setFilteredAsociados(filtered);
  }, [asociados, search, filterActive, filterInactive]);

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
        <FilterSearchBar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filterActive={filterActive}
          onActiveChange={() => setFilterActive((prev) => !prev)}
          filterInactive={filterInactive}
          onInactiveChange={() => setFilterInactive((prev) => !prev)}
        />
        <Link
          to={"/asociados/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear asociado
        </Link>
      </div>

      <AsociadoList asociados={filteredAsociados} />
    </>
  );
};
