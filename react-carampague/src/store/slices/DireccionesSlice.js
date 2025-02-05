// src/redux/slices/DireccionSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  hasLoaded: false,
};

export const DireccionesSlice = createSlice({
  name: "direccion",
  initialState,
  reducers: {
    setDirecciones: (state, action) => {
      action.payload.forEach((direccion) => {
        state.entities[direccion.id] = direccion;
      });
      state.hasLoaded = true;
    },
    addDireccion: (state, action) => {
      const direccion = action.payload;
      state.entities[direccion.id] = direccion;
    },
    updateDireccionEnStore: (state, action) => {
      const direccion = action.payload;
      if (state.entities[direccion.id]) {
        state.entities[direccion.id] = direccion;
      }
    },
    removeDireccion: (state, action) => {
      delete state.entities[action.payload];
    },
  },
});

export const { setDirecciones, addDireccion, updateDireccionEnStore, removeDireccion } = DireccionesSlice.actions;

