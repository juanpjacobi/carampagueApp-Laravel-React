import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getAsociados } from "../../store/thunks/AsociadosThunks";
import { AsociadoList } from "../../components/asociados/AsociadosList";


export const Asociados = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsociados());
  }, [dispatch]);

  const { asociados } = useSelector((state) => state.asociados);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1
          className="text-3xl underline underline-offset-8
         text-sky-700 font-semibold text-center mb-5"
        >
          Asociados
        </h1>
        <Link
          to={"/asociados/crear"}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2
    uppercase font-bold cursor-pointer rounded"
        >
          Crear asociado
        </Link>
      </div>
        <AsociadoList asociados={asociados} />
      
    </>
  );
};
