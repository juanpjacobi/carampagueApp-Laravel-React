import React from "react";

export const AjustesResumen = ({ descuentos, totalDescuentos, title }) => {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md md:shadow-gray-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-3">
        {descuentos.map((ajuste) => {
          // Si el ajuste tiene monto definido (distinto de 0 o falsy), úsalo; de lo contrario, usa el monto del tipo.
          const montoDisplay =
            Number(ajuste.monto) || Number(ajuste.tipo_ajuste.monto);
          return (
            <div
              key={ajuste.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span className="text-md text-gray-700">
                {ajuste.tipo_ajuste.concepto}
              </span>
              <span className="text-md font-semibold text-gray-900">
                - ${montoDisplay.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 flex justify-end">
        <span className="text-lg font-bold text-gray-900">
          Total descuentos: - ${totalDescuentos.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
