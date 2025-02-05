import { Outlet } from "react-router-dom";
import { NavBar } from "../components/shared/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  endInitialLoading,
  startInitialLoading,
} from "../store/slices/UiSlice";
import { Spinner } from "../components/utilities/spinners/Spinner";
import {
  getAsociados,
  getBarrios,
  getClientes,
  getCondicionesIva,
  getDocumentaciones,
  getEntregasRopa,
  getEstadosCiviles,
  getEstadosDocumentacion,
  getLineasDocumentacion,
  getLineasEntregaRopa,
  getLocalidades,
  getModalidades,
  getObjetivos,
  getPrendas,
  getProvincias,
  getServicios,
  getTalles,
  getTiposDocumentacion,
  getTiposPrendas,
  getTiposTelefonos,
  getValores,
} from "../store/thunks/zthunks";
import { getLineasServicios } from "../store/thunks/LineasServiciosThunks";
import { getMotivos } from "../store/thunks/MotivosThunks";
import { getTiposMotivos } from "../store/thunks/TiposMotivosThunks";
import { getFeriados } from "../store/thunks/FeriadosThunks";

export const Layout = () => {
  const dispatch = useDispatch();
  const { isInitialLoading } = useSelector((state) => state.ui);

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(startInitialLoading());
      try {
        await Promise.all([
          dispatch(getServicios()),
          dispatch(getLineasDocumentacion()),
          dispatch(getCondicionesIva()),
          dispatch(getEstadosCiviles()),
          dispatch(getModalidades()),
          dispatch(getEstadosDocumentacion()),
          dispatch(getTiposDocumentacion()),
          dispatch(getPrendas()),
          dispatch(getTiposPrendas()),
          dispatch(getTalles()),
          dispatch(getValores()),
          dispatch(getLocalidades()),
          dispatch(getBarrios()),
          dispatch(getProvincias()),
          dispatch(getTiposTelefonos()),
          dispatch(getEntregasRopa()),
          dispatch(getDocumentaciones()),
          dispatch(getClientes()),
          dispatch(getObjetivos()),
          dispatch(getAsociados()),
          dispatch(getLineasEntregaRopa()),
          dispatch(getLineasServicios()),
          dispatch(getMotivos()),
          dispatch(getTiposMotivos()),
          dispatch(getFeriados()),
        ]);
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
    <main className="m-auto w-full overflow-auto flex flex-col  items-center pattern">
      <div className="w-full border-b border-slate-300 shadow-lg  items-center flex flex-col lg:flex-row justify-between">
        <img src="/img/logo.jpg" alt="imagen logotipo" className="max-w-2xl" />
        <NavBar />
      </div>
      <div className="md:max-w-6xl flex flex-col md:p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
};
