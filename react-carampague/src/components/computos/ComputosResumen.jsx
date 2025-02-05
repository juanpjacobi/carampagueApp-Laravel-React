

export const ComputosResumen = ({ grupos, totalBruto, title }) => {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md md:shadow-gray-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {title}
      </h2>
      <div className="space-y-3 ">
        {grupos.map((grupo) => (
          <div
            key={grupo.valorHora}
            className="flex justify-between items-center border-b pb-1"
          >
            <span className="text-md text-gray-700">
              {grupo.totalHoras} horas a ${grupo.valorHora.toLocaleString()} cada una:
            </span>
            <span className="text-md font-semibold text-gray-900">
              ${grupo.subtotal.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 flex justify-end">
        <span className="text-lg font-bold text-gray-900">
          Total bruto: ${totalBruto.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
