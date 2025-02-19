import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LineasList } from "../../components/servicios/cobertura/LineasList";
import { AddLineaModal } from "../../components/servicios/AddLineaModal";
import { selectAllLineasServicio } from "../../store/selectors/ServiciosSelectors";

export const PlanDiario = () => {
  const allLineas = useSelector(selectAllLineasServicio);

  const todayISO = new Date().toLocaleDateString("en-CA");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(todayISO);

  const lineasFiltradas = allLineas.filter(
    (linea) =>
      linea.is_planificado === false && linea.fecha === fechaSeleccionada
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-center md:justify-start">
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-600 text-white px-4 py-2  rounded hover:bg-sky-700 mb-4"
        >
          Agregar Línea Manual
        </button>
      </div>
      <h1 className="text-3xl text-sky-700 font-semibold text-center mb-5">
        Plan Diario
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="border p-2"
        />
      </div>

      {showModal && (
        <AddLineaModal
          onClose={() => setShowModal(false)}
          isPlanDiario={true}
          defaultFecha={fechaSeleccionada}
        />
      )}

      <LineasList lineas={lineasFiltradas} isPlanDiario={true} />
    </div>
  );
};
