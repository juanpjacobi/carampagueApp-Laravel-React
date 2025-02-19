import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsociadoList } from "../../components/asociados/AsociadosList";
import { Empty } from "../../components/shared/Empty";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { useEffect, useState } from "react";
import { FilterSearchBar } from "../../components/shared/search/FilterSearchBar";
import { UsersList } from "../../components/users/UsersList";
import { selectEnrichedUsers } from "../../store/selectors/UsersSelectors";

export const Users = () => {
  const enrichedUsers = useSelector(selectEnrichedUsers);

  const { hasLoaded} = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.ui);


  // Estados para búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [filteredUsers, setFilteresUsers] = useState(enrichedUsers);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = enrichedUsers.filter((user) => {
      const matchesText =
        user.nombre_usuario && user.nombre_usuario.toLowerCase().includes(lowerSearch);
        const isActive = Number(user.activo) === 1;
        const matchesEstado = (isActive && filterActive) || (!isActive && filterInactive);
      return matchesText && matchesEstado;
    });
    setFilteresUsers(filtered);
  }, [enrichedUsers, search, filterActive, filterInactive]);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasLoaded && enrichedUsers.length === 0) {
    return (
      <Empty
        message={"Aun no hay usuarios registrados, crea uno para continuar"}
        link={"/usuarios/crear"}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Usuarios
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
          to={"/usuarios/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear usuario
        </Link>
      </div>

      <UsersList users={filteredUsers} />
    </>
  );
};
