import { Outlet } from "react-router-dom";
import { NavBar } from "../components/shared/NavBar";
import { useEffect } from "react";
import { getObjetivos } from "../store/thunks/ObjetivosThunks";
import { getClientes } from "../store/thunks/ClientesThunks";
import { getAsociados } from "../store/thunks/AsociadosThunks";
import { useDispatch } from "react-redux";


export const Layout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getObjetivos());
    dispatch(getClientes());
    dispatch(getAsociados());

  }, [dispatch]);
 
  return (
    <main className="m-auto w-95 flex flex-col items-center pattern">
      <div className="w-full border-b border-slate-300 shadow-lg  items-center flex flex-col lg:flex-row justify-between">
          <img
            src="/img/logo.jpg"
            alt="imagen logotipo"
            className="max-w-2xl"
          />
        <NavBar />
      </div>
      <div className="md:max-w-6xl p-1 flex flex-col md:p-10 w-full">
          <Outlet />
      </div>
    </main>
  );
};
