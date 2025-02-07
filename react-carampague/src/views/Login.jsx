import { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/thunks/AuthThunks";
import { Alerta } from "../components/shared/Alerta";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nombreUsuarioref = createRef();
  const passwordRef = createRef();
  const [errores, setErrores] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      nombre_usuario: nombreUsuarioref.current.value,
      password: passwordRef.current.value,
    };
  
    try {
      const response = await dispatch(login(datos));
      navigate("/inicio"); 
    } catch (error) {
      const erroresCapturados = Array.isArray(error) ? error : [error];
      setErrores(erroresCapturados);
    }
  };
  

  return (
    <>
      <h1 className="text-4xl text-gray-700 text-center">Inicio de sesión</h1>
      <div className="bg-white shadow-2xl rounded-md mt-5 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errores.length > 0 &&
            errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="nombre_usuario">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="nombre_usuario"
              className="mt-2 w-full p-3 bg-gray-200"
              name="nombre_usuario"
              placeholder="Ingresa tu nombre de usuario"
              ref={nombreUsuarioref}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-200"
              name="password"
              placeholder="Ingresa tu contraseña"
              ref={passwordRef}
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
