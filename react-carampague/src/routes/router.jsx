import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { AuthLayout } from "../layouts/AuthLayout";
import Inicio from "../views/Inicio";
import Login from "../views/Login";
import { 
  ClienteRouter, 
  ObjetivoRouter, 
  UserRouter, 
  AsociadosRouter, 
  ServicioRouter, 
  PlanDiarioRouter, 
  ComputosRouter, 
  AjustesRouter,
  ProtectedRoutes,
  GuestRoutes,
  AusentismoRouter,
  RecibosRouter,
  CarpetasMedicasRouter
} from "./index";

const router = createBrowserRouter([
  {
    // Rutas protegidas: si el usuario no está autenticado, se redirige a /auth
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            path: "/",
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
          {
            path: "/servicios/*",
            element: <ServicioRouter />,
          },
          {
            path: "/planes-diarios/*",
            element: <PlanDiarioRouter />,
          },
          {
            path: "/computos/*",
            element: <ComputosRouter />,
          },
          {
            path: "/ausentismo/*",
            element: <AusentismoRouter />,
          },
          {
            path: "/ajustes/*",
            element: <AjustesRouter />,
          },
          {
            path: "/recibos/*",
            element: <RecibosRouter />,
          },
          {
            path: "/carpetas-medicas/*",
            element: <CarpetasMedicasRouter />,
          },
        ],
      },
    ],
  },
  {
    // Rutas públicas (para invitados) se envuelven en GuestRoute
    path: "/auth",
    element: <GuestRoutes />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
