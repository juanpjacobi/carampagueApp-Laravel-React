// src/components/GuestRoutes.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/utilities/spinners/Spinner";

export const GuestRoutes = () => {
  const { token, user, loading } = useSelector((state) => state.auth);

  // Mientras se carga la información del usuario, mostramos un spinner
  if (token && loading) {
    return <Spinner />;
  }

  // Si ya se cargó la info y el usuario existe, redirige a /inicio
  if (token && user) {
    return <Navigate to="/inicio" replace />;
  }

  // Si no hay token o la carga ya terminó y no hay usuario, renderiza las rutas públicas
  return <Outlet />;
};
