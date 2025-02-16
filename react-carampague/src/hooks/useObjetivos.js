import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useObjetivos = (initialObjetivoId) => {
  // Convertimos el objeto a arreglo
  const allObjetivos = useSelector((state) =>state.objetivos.objetivos);

  // Estado para el objetivo seleccionado
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(
    initialObjetivoId ? allObjetivos.find((o) => Number(o.id) === Number(initialObjetivoId)) : null
  );

  // Estado para el query del dropdown. Si ya hay un objetivo seleccionado, usamos su nombre.
  const [objetivoQuery, setObjetivoQuery] = useState(
    objetivoSeleccionado ? objetivoSeleccionado.nombre : ""
  );

  const [filteredObjetivos, setFilteredObjetivos] = useState(allObjetivos);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  // Actualizamos la lista filtrada cada vez que allObjetivos cambia
  useEffect(() => {
    setFilteredObjetivos(allObjetivos);
  }, [allObjetivos]);

  useEffect(() => {
    if (objetivoQuery.trim() === "") {
      setFilteredObjetivos(allObjetivos);
    } else {
      const filtrados = allObjetivos.filter((o) =>
        o.nombre.toLowerCase().includes(objetivoQuery.toLowerCase())
      );
      setFilteredObjetivos(filtrados);
    }
  }, [objetivoQuery, allObjetivos]);

  return {
    objetivoQuery,
    setObjetivoQuery,
    filteredObjetivos,
    showDropdown,
    setShowDropdown,
    inputRef,
    objetivoSeleccionado,
    setObjetivoSeleccionado, // Se retorna el setter para actualizarlo desde el componente
  };
};
