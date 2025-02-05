
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},  // Objeto indexado por id
  allIds: [],    // Arreglo de IDs
  hasLoaded: false,
};

export const LineasServicioSlice = createSlice({
  name: "lineasServicio",
  initialState,
  reducers: {
    setLineasServicio: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((linea) => {
        newEntities[linea.id] = linea;
        newIds.push(linea.id);
      });
      state.entities = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addLineaServicio: (state, action) => {
      const linea = action.payload;
      state.entities[linea.id] = linea;
      if (!state.allIds.includes(linea.id)) {
        state.allIds = [...state.allIds, linea.id];
      }
    },
    updateLineaServicioEnStore: (state, action) => {
      const linea = action.payload;
      if (state.entities[linea.id]) {
        state.entities[linea.id] = linea;
      }
    },
    removeLineaServicio: (state, action) => {
      const id = action.payload;
      delete state.entities[id];
      state.allIds = state.allIds.filter((lineaId) => lineaId !== id);
    },
  },
});

export const { setLineasServicio, addLineaServicio, updateLineaServicioEnStore, removeLineaServicio } = LineasServicioSlice.actions;
