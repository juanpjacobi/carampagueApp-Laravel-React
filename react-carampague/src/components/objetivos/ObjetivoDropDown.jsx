// ObjetivoDropdown.jsx
import clsx from "clsx";

export const ObjetivoDropdown = ({
  objetivoQuery,
  setObjetivoQuery,
  filteredObjetivos,
  handleSelectObjetivo,
  handleDesasignarObjetivo,
  showDropdown,
  setShowDropdown,
}) => {
  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setShowDropdown(false);

  return (
    <div className="relative flex">
      <input
        type="text"
        value={objetivoQuery}
        onChange={(e) => setObjetivoQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Buscar objetivo"
        className={clsx("border p-1 rounded w-full", !objetivoQuery && "border-red-800")}
      />
      <button
        onClick={handleDesasignarObjetivo}
        className="text-red-600 ml-2 hover:underline"
      >
        X
      </button>
      {showDropdown && filteredObjetivos.length > 0 && (
        <ul className="absolute bg-white border shadow-lg z-10 w-full max-h-40 overflow-auto top-full">
          {filteredObjetivos.map((objetivo) => (
            <li
              key={objetivo.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectObjetivo(objetivo.id, objetivo.nombre);
              }}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            >
              {objetivo.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
