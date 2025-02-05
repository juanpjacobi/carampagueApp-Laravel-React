import {  useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Empty } from "../../components/shared/Empty";
import { ServiciosList } from "../../components/servicios/ServiciosList";
import { selectAllServicios } from "../../store/selectors/ServiciosSelectors";

export const Servicios = () => {


  const {  hasLoaded } = useSelector((state) => state.servicios);
  const servicios = useSelector(selectAllServicios);



  if (hasLoaded && servicios.length === 0) {
    return (
      <Empty
        message={"Aun no hay servicios registrados, crea uno para continuar"}
        link={"/servicios/crear"}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
          Servicios
        </h1>
        <Link
          to={"/servicios/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
        >
          Crear servicio
        </Link>
      </div>

      <ServiciosList servicios={servicios} />
    </>
  );
};
