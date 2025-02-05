import { useRef, useState } from "react";

export const AsociadoSelector = ({ asociados, linea, asignarAsociado }) => {
    const [asociadoQuery, setAsociadoQuery] = useState(
      linea.asociado
        ? `${linea.asociado.nombre ?? ""} ${linea.asociado.apellido ?? ""}`.trim()
        : ""
    );
  
    const [filteredAsociados, setFilteredAsociados] = useState(asociados);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);
  
    const handleSelectAsociado = async (asociadoId, fullName) => {
      await asignarAsociado({ asociado_id: asociadoId }, linea.id);
      setAsociadoQuery(fullName);
      setShowDropdown(false);
      inputRef.current?.blur();
    };
  
    const handleDesasignarAsociado = async () => {
      await asignarAsociado({ asociado_id: null }, linea.id);
      setAsociadoQuery("");
    };
  
    const handleQueryChange = (query) => {
      setAsociadoQuery(query);
  
      if (!query.trim()) {
        setFilteredAsociados(asociados);
        return;
      }
  
      const lowerQuery = query.toLowerCase();
      setFilteredAsociados(
        asociados.filter((a) =>
          `${a.nombre} ${a.apellido}`.toLowerCase().includes(lowerQuery)
        )
      );
    };
  
    return (
      <div className="flex relative">
        <input
          ref={inputRef}
          type="text"
          value={asociadoQuery}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Buscar asociado"
          className={`border p-1 rounded w-full ${
            !linea.asociado ? "border-b-2 border-red-500" : ""
          }`}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Retraso para permitir clics
        />
        {asociadoQuery && (
          <button
            onClick={handleDesasignarAsociado}
            className="text-red-600 ml-2 hover:underline"
          >
            X
          </button>
        )}
        {showDropdown && filteredAsociados.length > 0 && (
          <ul className="absolute bg-white border shadow-lg z-10 w-full max-h-40 overflow-auto top-full">
            {filteredAsociados.map((a) => {
              const fullName = `${a.nombre} ${a.apellido}`;
              return (
                <li
                  key={a.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectAsociado(a.id, fullName);
                  }}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
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
  