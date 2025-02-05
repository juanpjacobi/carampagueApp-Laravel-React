// src/views/servicios/Cobertura.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LineasList } from "../../../components/servicios/cobertura/LineasList";
import { AddLineaModal } from "../../../components/servicios/AddLineaModal";
import { makeSelectLineasServicioByServicioId, makeSelectServicioById } from "../../../store/selectors/ServiciosSelectors";

export const Cobertura = () => {
  const { id } = useParams(); // id del servicio
  const navigate = useNavigate();

  const selectedServicio = useSelector(makeSelectServicioById(id));

  // Obtenemos las líneas asociadas al servicio a partir del slice de lineasServicio
  const lineasServicio = useSelector(makeSelectLineasServicioByServicioId(id));

  useEffect(() => {
    if (!selectedServicio) {
      navigate("/servicios");
    }
  }, [selectedServicio, navigate]);

  if (!selectedServicio) return null;

  // Filtramos las líneas que sean planificadas
  const lineasPlan = lineasServicio.filter((l) => l.is_planificado);
  // Estados para el modal (crear/editar)
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lineaData, setLineaData] = useState(null);

  // Para crear una línea nueva
  const handleCrearLinea = () => {
    setIsEditing(false);
    setLineaData(null);
    setShowModal(true);
  };

  // Para editar una línea existente
  const handleEditLinea = (linea) => {
    setIsEditing(true);
    setLineaData(linea);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setLineaData(null);
  };

  return (
    <div>
      <button
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        onClick={handleCrearLinea}
      >
        Agregar Línea
      </button>
      {showModal && (
        <AddLineaModal
          onClose={handleCloseModal}
          servicioId={selectedServicio.id}
          isPlanDiario={false}
          isEditing={isEditing}
          lineaData={lineaData}
        />
      )}
      <LineasList lineas={lineasPlan} isPlanDiario={false} onEditLinea={handleEditLinea} />
    </div>
  );
};
