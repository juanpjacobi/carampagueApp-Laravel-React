import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrendas,
  createPrenda,
  updatePrenda,
  createTalle,
  createTipoPrenda,
  getTalles,
  getTiposPrendas,
} from "../../store/thunks/PrendasThunks";

import { Alerta } from "../../components/shared/Alerta";
import {selectEnrichedPrendas} from "../../store/selectors/PrendasSelectors";


export const Prendas = () => {
  const dispatch = useDispatch();

  // Usamos el selector enriquecido para obtener las prendas con información completa
  const enrichedPrendas = useSelector(selectEnrichedPrendas);
  const tiposPrendas = useSelector((state) => state.prendas.tiposPrendas);
  const talles = useSelector((state) => state.prendas.talles);

  // Estado para el formulario de agregar nueva prenda (ingresamos nombre de tipo y talle como texto)
  const [tipoInput, setTipoInput] = useState("");
  const [talleInput, setTalleInput] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  // Estados para actualizar el stock de una prenda existente
  const [editingPrenda, setEditingPrenda] = useState(null);
  const [newStock, setNewStock] = useState("");



  // Manejadores para el formulario de agregar nueva prenda
  const handleNewPrendaChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipo_prenda") {
      setTipoInput(value);
    } else if (name === "talle") {
      setTalleInput(value);
    } else if (name === "stock") {
      setStock(value);
    }
  };

  const handleCreatePrenda = async (e) => {
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

  // Manejadores para actualizar stock de una prenda existente
  const handleEditClick = (prenda) => {
    setEditingPrenda(prenda);
    setNewStock(prenda.stock);
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    if (!editingPrenda) return;
    try {
      await dispatch(updatePrenda({ stock: newStock }, editingPrenda.id));
      setEditingPrenda(null);
      setNewStock("");
    } catch (error) {
      setError("Error al actualizar la prenda");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Stock de Prendas</h1>

      {/* Formulario para agregar nueva prenda */}
      <div className="border p-4 rounded mb-8 shadow">
        <h2 className="text-xl font-semibold mb-2">Agregar Nueva Prenda</h2>
        {error && <Alerta error={error} />}
        <form onSubmit={handleCreatePrenda} className="space-y-4">
          <div>
            <label className="block mb-1">Tipo de prenda:</label>
            <input
              type="text"
              name="tipo_prenda"
              value={tipoInput}
              onChange={handleNewPrendaChange}
              className="w-full border p-2 rounded"
              placeholder="Ingrese el nombre del tipo"
            />
          </div>
          <div>
            <label className="block mb-1">Talle:</label>
            <input
              type="text"
              name="talle"
              value={talleInput}
              onChange={handleNewPrendaChange}
              className="w-full border p-2 rounded"
              placeholder="Ingrese el nombre del talle"
            />
          </div>
          <div>
            <label className="block mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={handleNewPrendaChange}
              className="w-full border p-2 rounded"
              placeholder="Ingrese el stock"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar prenda
          </button>
        </form>
      </div>

      {/* Lista de prendas para actualizar stock */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          Actualizar Stock de Prendas
        </h2>
        {enrichedPrendas.length === 0 ? (
          <Alerta error="No hay prendas registradas." />
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Talle</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {enrichedPrendas.map((prenda) => (
                <tr key={prenda.id}>
                  <td className="border p-2">{prenda.id}</td>
                  <td className="border p-2">
                    {prenda.tipo_prenda
                      ? prenda.tipo_prenda.nombre_tipo_prenda
                      : prenda.tipo_prenda_id}
                  </td>
                  <td className="border p-2">
                    {prenda.talle ? prenda.talle.nombre_talle : prenda.talle_id}
                  </td>
                  <td className="border p-2">{prenda.stock}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEditClick(prenda)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Editar stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {editingPrenda && (
          <form onSubmit={handleUpdateStock} className="mt-4">
            <h3 className="text-lg font-semibold">
              Actualizar Stock para Prenda {editingPrenda.id}
            </h3>
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded ml-2"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingPrenda(null);
                setNewStock("");
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
