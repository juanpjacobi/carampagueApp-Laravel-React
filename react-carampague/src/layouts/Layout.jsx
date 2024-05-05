import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { getClientes } from "../store/thunks/ClientesThunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Layout = () => {

    // const dispatch = useDispatch()
    // useEffect(() => {
    //   dispatch(getClientes());
    // }, [dispatch]);
  
  
  
  return (
    <main className="m-auto flex flex-col items-center pattern">
      <div className="w-full border-b border-slate-200 items-center flex flex-col lg:flex-row justify-between">
        <div>
          <img
            src="../img/logo.jpg"
            alt="imagen logotipo"
            className="max-w-2xl"
          />
        </div>
        <NavBar />
      </div>

      <div className="max-w-6xl p-10 w-full">
          <Outlet />
      </div>
    </main>
  );
};
