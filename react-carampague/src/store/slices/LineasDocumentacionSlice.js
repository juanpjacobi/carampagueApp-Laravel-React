// src/redux/slices/LineasDocumentacionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineas: {}, // Objeto indexado por id
  allIds: [],   // Array de ids
  hasLoaded: false,
};

export const LineasDocumentacionSlice = createSlice({
  name: "lineasDocumentacion",
  initialState,
  reducers: {
    setLineasDocumentacion: (state, action) => {
      action.payload.forEach(linea => {
        state.lineas[linea.id] = linea;
        if (!state.allIds.includes(linea.id)) {
          state.allIds.push(linea.id);
        }
      });
      state.hasLoaded = true;
    },
    addLineaDocumentacion: (state, action) => {
      const linea = action.payload;
      state.lineas[linea.id] = linea;
      if (!state.allIds.includes(linea.id)) {
        state.allIds = [...state.allIds, linea.id];
      }
    },
    updateLineaDocumentacionEnStore: (state, action) => {
      const linea = action.payload;
      if (state.lineas[linea.id]) {
        state.lineas[linea.id] = linea;
      }
    },
    removeLineaDocumentacion: (state, action) => {
      const id = action.payload;
      delete state.lineas[id];
      state.allIds = state.allIds.filter((lineaId) => lineaId !== id);
    },
  },
});

export const {
  setLineasDocumentacion,
  addLineaDocumentacion,
  updateLineaDocumentacionEnStore,
  removeLineaDocumentacion,
} = LineasDocumentacionSlice.actions;

export default LineasDocumentacionSlice.reducer;
