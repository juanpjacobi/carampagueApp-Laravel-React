import { Outlet } from "react-router-dom";
import { NavBar } from "../components/shared/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startInitialLoading,
  endInitialLoading,
} from "../store/slices/UiSlice";
import { Spinner } from "../components/utilities/spinners/Spinner";
import { loadInitialResources } from "../store/thunks/LoadInitialResourcecs";

export const Layout = () => {
  const dispatch = useDispatch();
  const { isInitialLoading } = useSelector((state) => state.ui);
  const currentUser = useSelector((state) => state.auth.user);
  const roles = useSelector((state) => state.roles.roles);

  const userRole = roles.find((r) => r.id === currentUser?.rol_id);
  useEffect(() => {
    const fetchResources = async () => {
      dispatch(startInitialLoading());
      try {
        await loadInitialResources(dispatch);
      } finally {
        dispatch(endInitialLoading());
      }
    };
    fetchResources();
  }, [dispatch]);

  if (isInitialLoading) {
    return <Spinner />;
  }

  return (
    <main className="m-auto w-full overflow-auto flex flex-col items-center pattern">
      <div className="w-full border-b border-slate-300 shadow-lg items-center flex flex-col xl:flex-row justify-between">
        <div className="flex flex-col xl:flex-row items-center justify-center">
          <img
            src="/img/logo-removebg.png"
            alt="imagen logotipo"
            className="max-w-2xl"
          />
          {currentUser && (
            <div className="flex items-center justify-center text-center text-sm text-slate-600 ">
              <span className="p-2 bg-sky-100 text-black border-2 border-sky-600 rounded-3xl shadow-md shadow-gray-700 ">
                {currentUser.nombre_usuario}{" "}
                {userRole ? userRole.nombre_rol : ""}
              </span>
            </div>
          )}
        </div>
        <div>
          <NavBar />
        </div>
      </div>

      <div className="md:max-w-7xl flex flex-col md:p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
};
