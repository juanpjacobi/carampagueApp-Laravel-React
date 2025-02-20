// useClientes.js
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useClientes = (initialClienteId) => {
  const allClientes = useSelector((state) => state.clientes.clientes);
  const clienteSeleccionado = allClientes.find(
    (c) => Number(c.id) === Number(initialClienteId)
  );
  const [clienteQuery, setClienteQuery] = useState(
    clienteSeleccionado ? clienteSeleccionado.razon_social : ""
  );
  const [filteredClientes, setFilteredClientes] = useState(allClientes);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (clienteSeleccionado) {
      setClienteQuery(clienteSeleccionado.razon_social);
    } else {
      setClienteQuery("");
    }
  }, [clienteSeleccionado]);

  useEffect(() => {
    if (clienteQuery.trim() === "") {
      setFilteredClientes(allClientes);
    } else {
      const filtrados = allClientes.filter((c) =>
        c.razon_social.toLowerCase().includes(clienteQuery.toLowerCase())
      );
      setFilteredClientes(filtrados);
    }
  }, [clienteQuery, allClientes]);

  return {
    clienteQuery,
    setClienteQuery,
    filteredClientes,
    showDropdown,
    setShowDropdown,
    inputRef,
    clienteSeleccionado,
  };
};
