import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { AuthLayout } from "../layouts/AuthLayout";
import Inicio from "../views/Inicio";
import Login from "../views/Login";
import { ClienteRouter, ObjetivoRouter, UserRouter, AsociadosRouter } from "./index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/inicio/",
        element: <Inicio />,
      },
      {
        path: "/usuarios/*",
        element: <UserRouter />,
      },
      {
        path: "/clientes/*",
        element: <ClienteRouter />,
      },
      {
        path: "/objetivos/*",
        element: <ObjetivoRouter />,
      },
      {
        path: "/asociados/*",
        element: <AsociadosRouter />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);

export default router;
