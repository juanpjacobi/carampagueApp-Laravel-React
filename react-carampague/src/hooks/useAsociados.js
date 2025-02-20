// src/hooks/useAsociados.js
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useAsociados = (asociadoId) => {
  const allAsociados = useSelector((state) => state.asociados.asociados);

  const asociadoSeleccionado = allAsociados.find(
    (a) => Number(a.id) === Number(asociadoId)
  );

  // Inicializamos la query en base al asociado encontrado, o en vacío si no se encuentra
  const [asociadoQuery, setAsociadoQuery] = useState(
    asociadoSeleccionado
      ? `${asociadoSeleccionado.nombre} ${asociadoSeleccionado.apellido}`
      : ""
  );
  const [filteredAsociados, setFilteredAsociados] = useState(allAsociados);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Si cambia el asociadoSeleccionado, actualizamos la query
    if (asociadoSeleccionado) {
      setAsociadoQuery(`${asociadoSeleccionado.nombre} ${asociadoSeleccionado.apellido}`);
    } else {
      setAsociadoQuery("");
    }
  }, [asociadoSeleccionado]);

  useEffect(() => {
    if (asociadoQuery.trim() === "") {
      setFilteredAsociados(allAsociados);
    } else {
      const filtrados = allAsociados.filter((a) =>
        `${a.nombre} ${a.apellido}`.toLowerCase().includes(asociadoQuery.toLowerCase())
      );
      setFilteredAsociados(filtrados);
    }
  }, [asociadoQuery, allAsociados]);

  return {
    asociadoQuery,
    setAsociadoQuery,
    filteredAsociados,
    showDropdown,
    setShowDropdown,
    inputRef,
    asociadoSeleccionado,
  };
};
