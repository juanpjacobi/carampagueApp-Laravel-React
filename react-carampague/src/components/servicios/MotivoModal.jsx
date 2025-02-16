import React, { useState } from "react";
import ReactDOM from "react-dom";

export const MotivoModal = ({ onClose, onSubmit, tiposMotivos, motivoEditable }) => {
  const [selectedMotivo, setSelectedMotivo] = useState(
    motivoEditable?.tipo_motivo_id || ""
  );
  const [observaciones, setObservaciones] = useState(
    motivoEditable?.observaciones || ""
  );

  const handleGuardar = () => {
    onSubmit({
      tipo_motivo_id: selectedMotivo,
      observaciones,
    });
  };

  // Renderizamos el modal en un portal para que salga fuera del tbody
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {motivoEditable ? "Editar Motivo" : "Nuevo Motivo"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Motivo
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={selectedMotivo}
            onChange={(e) => setSelectedMotivo(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un motivo
            </option>
            {tiposMotivos.map((motivo) => (
              <option key={motivo.id} value={motivo.id}>
                {motivo.nombre_tipo_motivo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Observaciones (opcional)
          </label>
          <textarea
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            onClick={handleGuardar}
            disabled={!selectedMotivo}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
