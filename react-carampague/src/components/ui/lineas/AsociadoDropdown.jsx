import clsx from "clsx";

export const AsociadoDropdown = ({
    asociadoQuery,
    setAsociadoQuery,
    filteredAsociados,
    handleSelectAsociado,
    handleDesasignarAsociado,
    showDropdown,
    setShowDropdown,
  }) => {
    const handleFocus = () => setShowDropdown(true);
    const handleBlur = () => setShowDropdown(false);
  
    return (
      <div className="flex relative">
        <input
          type="text"
          value={asociadoQuery.toUpperCase()}
          onChange={(e) => setAsociadoQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Buscar asociado"
          className={clsx("border p-1 rounded w-full", !asociadoQuery && "border-red-800")}
        />
        <button
          onClick={handleDesasignarAsociado}
          className="text-red-600 ml-2 hover:underline"
        >
          X
        </button>
        {showDropdown && filteredAsociados.length > 0 && (
          <ul className="absolute bg-white border shadow-lg z-10 w-full max-h-40 overflow-auto top-full">
            {filteredAsociados.map((asociado) => {
              const fullName = `${asociado.nombre} ${asociado.apellido}`;
              return (
                <li
                  key={asociado.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectAsociado(asociado.id, fullName);
                  }}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer uppercase"
                >
                  {fullName}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };
  