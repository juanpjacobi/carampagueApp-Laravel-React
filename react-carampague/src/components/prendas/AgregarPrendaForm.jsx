import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTiposPrendas,
  getTalles,
  createTalle,
  createTipoPrenda,
  createPrenda,
  getPrendas,
} from "../../store/thunks/PrendasThunks";

import { Alerta } from "../shared/Alerta";

export const AgregarPrendaForm = () => {
  const dispatch = useDispatch();

  // Obtener datos del store
  const tiposPrendas = useSelector((state) => state.prendas.tiposPrendas);
  const talles = useSelector((state) => state.prendas.talles);

  // Estados para el formulario
  const [tipoInput, setTipoInput] = useState("");
  const [talleInput, setTalleInput] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getTiposPrendas());
    dispatch(getTalles());
    dispatch(getPrendas());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipoInput || !talleInput || stock === "") {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    let tipoId;
    let talleId;

    // Buscar el tipo existente (comparación case-insensitive)
    const existingTipo = tiposPrendas.find(
      (t) => t.nombre_tipo_prenda.toLowerCase() === tipoInput.toLowerCase()
    );
    if (existingTipo) {
      tipoId = existingTipo.id;
    } else {
      try {
        const nuevoTipo = await dispatch(
          createTipoPrenda({ nombre_tipo_prenda: tipoInput })
        );
        tipoId = nuevoTipo.id;
      } catch (error) {
        setError("Error al crear el tipo de prenda");
        return;
      }
    }

    // Buscar el talle existente
    const existingTalle = talles.find(
      (t) => t.nombre_talle.toLowerCase() === talleInput.toLowerCase()
    );
    if (existingTalle) {
      talleId = existingTalle.id;
    } else {
      try {
        const nuevoTalle = await dispatch(
          createTalle({ nombre_talle: talleInput })
        );
        talleId = nuevoTalle.id;
      } catch (error) {
        setError("Error al crear el talle");
        return;
      }
    }

    // Crear la prenda
    try {
      const prendaData = {
        stock: Number(stock),
        tipo_prenda_id: tipoId,
        talle_id: talleId,
      };
      await dispatch(createPrenda(prendaData));
      setTipoInput("");
      setTalleInput("");
      setStock("");
    } catch (error) {
      setError("Error al crear la prenda");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agregar Nueva Prenda</h1>
      {error && <Alerta error={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tipo de prenda:</label>
          <input
            type="text"
            value={tipoInput}
            onChange={(e) => setTipoInput(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Ingrese el nombre del tipo"
          />
        </div>
        <div>
          <label className="block mb-1">Talle:</label>
          <input
            type="text"
            value={talleInput}
            onChange={(e) => setTalleInput(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Ingrese el nombre del talle"
          />
        </div>
        <div>
          <label className="block mb-1">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Ingrese el stock"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar Prenda
        </button>
      </form>
    </div>
  );
};
