import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { clsx } from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/thunks/AuthThunks";
export const NavBar = () => {
  const dispatch = useDispatch();
  const [hiddeNavbar, setHiddeNavbar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setHiddeNavbar(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="uppercase text-sm xl:text-sm text-slate-800 p-10">
      <div className={clsx(hiddeNavbar && "lg:hidden", "flex justify-center")}>
        <GiHamburgerMenu
          className="cursor-pointer"
          size={30}
          onClick={() => setHiddeNavbar(!hiddeNavbar)}
        />
      </div>
      <div
        className={clsx(
          hiddeNavbar
            ? "hidden lg:flex flex-row justify-around items-center"
            : "flex flex-col justify-between gap-6 items-center"
        )}
      >
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/inicio"}
        >
          inicio
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/asociados"}
        >
          asociados
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/usuarios"}
        >
          usuarios
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/objetivos"}
        >
          objetivos
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/clientes"}
        >
          clientes
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/servicios"}
        >
          servicios
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/planes-diarios"}
        >
          plan
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/computos"}
        >
          cómputos
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/ausentismo"}
        >
          ausentismo
        </NavLink>
        <NavLink
          className="hover:bg-sky-800 hover:text-white p-2 rounded-lg"
          to={"/ajustes"}
        >
          ajustes
        </NavLink>
        <button
          onClick={() => dispatch(logout())}
          className="bg-gray-600 hover:bg-gray-700 uppercase text-white w-full p-2 cursor-pointer rounded-lg ml-1"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
