// src/main.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./store/index";
import router from "./routes/router";
import { getUser } from "./store/thunks/AuthThunks";
import { Spinner } from "./components/utilities/spinners/Spinner";
import "./index.css";

// Componente raíz que se encarga de inicializar la autenticación
const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // Si existe un token, intenta obtener la información del usuario
      if (token) {
        try {
          await dispatch(getUser());
        } catch (error) {
          // Opcional: maneja el error si fetchUser falla
          console.error("Error al obtener el usuario:", error);
        }
      }
      // Cuando ya se haya intentado cargar (independientemente del resultado),
      // marcamos la autenticación como inicializada.
      setAuthInitialized(true);
    };

    initAuth();
  }, [dispatch, token]);

  // Mientras la autenticación no esté inicializada, mostramos un spinner
  if (!authInitialized) {
    return <Spinner />;
  }

  // Una vez inicializado, renderizamos el RouterProvider con el router
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
