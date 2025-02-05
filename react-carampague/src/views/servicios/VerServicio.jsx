// src/views/servicios/VerServicio.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ServicioCard } from "../../components/servicios/ServicioCard";
import { makeSelectServicioEnriquecidoById } from "../../store/selectors/ServiciosSelectors";

export const VerServicio = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const servicioEnriquecido = useSelector(makeSelectServicioEnriquecidoById(id));
  
  useEffect(() => {
    if (!servicioEnriquecido) {
      navigate("/servicios");
    }
  }, [servicioEnriquecido, navigate]);

  if (!servicioEnriquecido) return null;

  return <ServicioCard selectedServicio={servicioEnriquecido} />;
};
