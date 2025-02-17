import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "../../components/shared/Empty";
import { ClientesList } from "../../components/clientes/ClientesList";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { selectClientesConRelaciones } from "../../store/selectors/ClientesSelectors";
import { useEffect, useState } from "react";
import { FilterSearchBar } from "../../components/shared/search/FilterSearchBar";

export const Clientes = () => {
  const clientes = useSelector(selectClientesConRelaciones);

  const { hasLoaded } = useSelector((state) => state.clientes);
  const { isLoading } = useSelector((state) => state.ui);

  // Estados para búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [filteredClientes, setFilteredClientes] = useState(clientes);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = clientes.filter((cliente) => {
      const matchesText =
        cliente.razon_social &&
        cliente.razon_social.toLowerCase().includes(lowerSearch);
      const matchesEstado =
        (cliente.activo === 1 && filterActive) ||
        (cliente.activo !== 1 && filterInactive);
      return matchesText && matchesEstado;
    });
    setFilteredClientes(filtered);
  }, [clientes, search, filterActive, filterInactive]);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasLoaded && clientes.length === 0) {
    return (
      <Empty
        message={"Aun no hay clientes registrados, crea uno para continuar"}
        link={"/clientes/crear"}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Clientes
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
          to={"/clientes/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear cliente
        </Link>
      </div>

      <ClientesList clientes={filteredClientes} />
    </>
  );
};
