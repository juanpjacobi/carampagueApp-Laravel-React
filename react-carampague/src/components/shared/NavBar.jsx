import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { clsx } from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/thunks/AuthThunks";

export const NavBar = () => {
  const dispatch = useDispatch();
  const [hiddeNavbar, setHiddeNavbar] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const location = useLocation();
  const navRef = useRef(null); 

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (groupName) => {
    setOpenDropdown((prev) => (prev === groupName ? null : groupName));
  };

  const navGroups = [
    {
      title: "Nóminas",
      items: [
        { to: "/asociados", label: "Asociados" },
        { to: "/objetivos", label: "Objetivos" },
        { to: "/clientes", label: "Clientes" },
      ],
    },
    {
      title: "Servicios",
      items: [
        { to: "/servicios", label: "Servicios" },
        { to: "/planes-diarios", label: "Plan" },
      ],
    },
    {
      title: "Cómputos",
      items: [
        { to: "/computos", label: "Cómputos" },
        { to: "/ausentismo", label: "Ausentismo" },
        { to: "/ajustes", label: "Ajustes" },
      ],
    },
    {
      title: "Pagos",
      items: [
        { to: "/recibos", label: "Recibos" },
        { to: "/carpetas-medicas", label: "Carpetas" },
      ],
    },
    {
      title: "Facturación",
      items: [
        { to: "/facturas/diagramas", label: "Diagramas" },
        { to: "/facturas/all", label: "Facturas" },

      ],
    },
    {
      title: "Admin",
      items: [
        { to: "/usuarios", label: "Usuarios" },
      ],
    },
  ];

  return (
    <nav ref={navRef} className="uppercase text-sm xl:text-sm text-slate-800 p-10">
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
            ? "hidden lg:flex flex-row justify-around items-center gap-5"
            : "flex flex-col justify-between gap-6 items-center"
        )}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              "hover:bg-sky-800 hover:text-white p-2 rounded-lg",
              isActive && "bg-sky-800 text-white"
            )
          }
        >
          Inicio
        </NavLink>
        {navGroups.map((group) => {
          const isGroupActive = group.items.some((item) =>
            location.pathname.startsWith(item.to)
          );
          return (
            <div key={group.title} className="relative">
              <button
                onClick={() => toggleDropdown(group.title)}
                className={clsx(
                  "hover:bg-sky-800 hover:text-white p-2 rounded-lg",
                  isGroupActive && "bg-sky-800 text-white"
                )}
              >
                {group.title.toLocaleUpperCase()}
              </button>
              {openDropdown === group.title && (
                <div className="absolute top-full left-0 bg-white shadow-md rounded mt-1 z-10">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpenDropdown(null)} 
                      className={({ isActive }) =>
                        clsx(
                          "block px-4 py-2 hover:bg-sky-800 hover:text-white rounded-md",
                          isActive && "bg-sky-800 text-white"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={() => dispatch(logout())}
          className="bg-gray-600 hover:bg-gray-700 uppercase text-white p-2 cursor-pointer rounded-lg ml-1"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
