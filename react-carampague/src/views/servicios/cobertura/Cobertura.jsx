// src/views/servicios/Cobertura.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LineasList } from "../../../components/servicios/cobertura/LineasList";
import { AddLineaModal } from "../../../components/servicios/AddLineaModal";
import {  makeSelectServicioById, makeSelectSortedLineasPlanEnriquecidasByServicioId } from "../../../store/selectors/ServiciosSelectors";

export const Cobertura = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const selectedServicio = useSelector(makeSelectServicioById(id));

  const lineasServicio = useSelector(makeSelectSortedLineasPlanEnriquecidasByServicioId(id));

  useEffect(() => {
    if (!selectedServicio) {
      navigate("/servicios");
    }
  }, [selectedServicio, navigate]);

  if (!selectedServicio) return null;

  const lineasPlan = lineasServicio.filter((l) => l.is_planificado);
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
    <div className="p-4">

      {showModal && (
        <AddLineaModal
          onClose={handleCloseModal}
          servicioId={selectedServicio.id}
          isPlanDiario={false}
          isEditing={isEditing}
          lineaData={lineaData}
        />
      )}
      <LineasList lineas={lineasPlan} isPlanDiario={false} onEditLinea={handleEditLinea} handleCrearLinea={handleCrearLinea}/>
    </div>
  );
};
