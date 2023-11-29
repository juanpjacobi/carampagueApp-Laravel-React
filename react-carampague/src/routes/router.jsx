import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { AuthLayout } from "../layouts/AuthLayout";
import Inicio from "../views/Inicio";
import Login from "../views/Login";
import {UserRouter} from "./UserRouter"
import { ClienteRouter } from "./ClienteRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
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
