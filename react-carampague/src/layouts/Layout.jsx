import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const Layout = () => {


  return (
    <main className="m-auto flex flex-col items-center pattern">
      <div className="w-full border-b border-slate-200 items-center flex flex-col md:flex-row justify-between">
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
