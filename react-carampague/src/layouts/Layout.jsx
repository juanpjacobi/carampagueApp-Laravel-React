import { Outlet } from "react-router-dom";
import { NavBar } from "../components/shared/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startInitialLoading, endInitialLoading } from "../store/slices/UiSlice";
import { Spinner } from "../components/utilities/spinners/Spinner";
import { loadInitialResources } from "../store/thunks/LoadInitialResourcecs";

export const Layout = () => {
  const dispatch = useDispatch();
  const { isInitialLoading } = useSelector((state) => state.ui);

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
      <div className="w-full border-b border-slate-300 shadow-lg items-center flex flex-col lg:flex-row justify-between">
        <img src="/img/logo.jpg" alt="imagen logotipo" className="max-w-2xl" />
        <NavBar />
      </div>
      <div className="md:max-w-7xl flex flex-col md:p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
};
