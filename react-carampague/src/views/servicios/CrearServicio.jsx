import { Link } from "react-router-dom";
import { ServicioForm } from "../../components/servicios/ServicioForm";


export const CrearServicio = () => {


  return (
    <div className="max-w-2xl w-full m-auto p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 text-sky-700 font-semibold text-center">
          Crear nuevo servicio
        </h1>
        <Link
          to={"/servicios/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <ServicioForm editMode={false}/>
      </div>
    </div>
  );
};
