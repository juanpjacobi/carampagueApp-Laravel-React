// src/redux/slices/EntregaRopaSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entregasRopa: {}, // Objeto indexado por ID
  allIds: [],       // Array de IDs
  hasLoaded: false,
};

export const EntregaRopaSlice = createSlice({
  name: "entregasRopa",
  initialState,
  reducers: {
    setEntregaRopa: (state, action) => {
      action.payload.forEach(entrega => {
        state.entregasRopa[entrega.id] = entrega;
        if (!state.allIds.includes(entrega.id)) {
          state.allIds.push(entrega.id);
        }
      });
      state.hasLoaded = true;
    },
    
    addEntregaRopa: (state, action) => {
      const entrega = action.payload;
      if (!entrega || entrega.id == null) return;
      // Asignamos la entrega al objeto (Immer se encargará de la inmutabilidad)
      state.entregasRopa[entrega.id] = entrega;
      // Actualizamos el array de IDs creando una nueva referencia
      if (!state.allIds.includes(entrega.id)) {
        state.allIds = [...state.allIds, entrega.id];
      }
    },
    updateEntregaRopaEnStore: (state, action) => {
      const entrega = action.payload;

      if (state.entregasRopa[entrega.id]) {
        state.entregasRopa[entrega.id] = entrega;
      } 
    },
    removeEntregaRopa: (state, action) => {
      const id = action.payload;
      delete state.entregasRopa[id];
      state.allIds = state.allIds.filter(entregaId => entregaId !== id);
    },
    
  },
});

export const { setEntregaRopa, addEntregaRopa, updateEntregaRopaEnStore, removeEntregaRopa } = EntregaRopaSlice.actions;

export default EntregaRopaSlice.reducer;
