import { createRef, useState } from "react";
import { Alerta } from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";


export default function Login() {
  const nombreUsuarioref = createRef();
  const passwordRef = createRef();
  const [errores, setErrores] = useState([]);
  const {login} = useAuth({
    middleware: 'guest',
    url: '/'
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    const datos = {
      nombre_usuario: nombreUsuarioref.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
  };

  return (
    <>
      <h1 className="text-4xl text-gray-700 text-center">Inicio de sesión</h1>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errores ?  errores.map((error, i)=><Alerta key={i}>{error}</Alerta>) : null}
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
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3
          uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
