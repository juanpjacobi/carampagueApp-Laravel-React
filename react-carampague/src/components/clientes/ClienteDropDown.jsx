// ClienteDropdown.jsx
import clsx from "clsx";

export const ClienteDropdown = ({
  clienteQuery,
  setClienteQuery,
  filteredClientes,
  handleSelectCliente,
  handleDesasignarCliente,
  showDropdown,
  setShowDropdown,
}) => {
  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setShowDropdown(false);

  return (
    <div className="relative flex">
      <input
        type="text"
        value={clienteQuery}
        onChange={(e) => setClienteQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Buscar cliente"
        className={clsx("border p-1 rounded w-full", !clienteQuery && "border-red-800")}
      />
      <button
        onClick={handleDesasignarCliente}
        className="text-red-600 ml-2 hover:underline"
      >
        X
      </button>
      {showDropdown && filteredClientes.length > 0 && (
        <ul className="absolute bg-white border shadow-lg z-10 w-full max-h-40 overflow-auto top-full">
          {filteredClientes.map((cliente) => (
            <li
              key={cliente.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectCliente(cliente.id, cliente.razon_social);
              }}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            >
              {cliente.razon_social}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
