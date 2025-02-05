// src/redux/slices/LineasEntregaRopaSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineas: {}, // Objeto indexado por ID
  allIds: [],  // Array de todos los IDs
  hasLoaded: false,
};

export const LineasEntregaRopaSlice = createSlice({
  name: "lineasEntregaRopa",
  initialState,
  reducers: {
    setLineasEntregaRopa: (state, action) => {
      action.payload.forEach((linea) => {
        state.lineas[linea.id] = linea;
        if (!state.allIds.includes(linea.id)) {
          state.allIds.push(linea.id);
        }
      });
      state.hasLoaded = true;
    },
    addLineaEntregaRopa: (state, action) => {
      const linea = action.payload;
      state.lineas[linea.id] = linea;
      if (!state.allIds.includes(linea.id)) {
        state.allIds.push(linea.id);
      }
    },
    updateLineaEntregaRopaEnStore: (state, action) => {
      const linea = action.payload;
      if (state.lineas[linea.id]) {
        state.lineas[linea.id] = linea;
      }
    },
    removeLineaEntregaRopa: (state, action) => {
      const id = action.payload;
      delete state.lineas[id];
      state.allIds = state.allIds.filter((lineaId) => lineaId !== id);
    },
  },
});

export const { setLineasEntregaRopa, addLineaEntregaRopa, updateLineaEntregaRopaEnStore, removeLineaEntregaRopa } = LineasEntregaRopaSlice.actions;

export default LineasEntregaRopaSlice.reducer;
