import React from "react";

export const AjustesResumen = ({ title, ajustes, totalNeto }) => {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md md:shadow-gray-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-3">
        {ajustes.map((ajuste) => {
          const montoEffective =
            Number(ajuste.monto) || Number(ajuste.tipo_ajuste.monto);
          const sign = ajuste.tipo_ajuste.add ? "+" : "–";
          const colorClass = ajuste.tipo_ajuste.add
            ? "text-green-600"
            : "text-red-600";
          return (
            <div
              key={ajuste.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span className="text-md text-gray-700">
                {ajuste.tipo_ajuste.concepto}
              </span>
              <span className={`text-md font-semibold ${colorClass}`}>
                {sign} ${montoEffective.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 flex justify-end">
        <span className="text-lg font-bold text-gray-900">
          Total ajustes: {totalNeto < 0 ? "–" : "+"} $
          {Math.abs(totalNeto).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
