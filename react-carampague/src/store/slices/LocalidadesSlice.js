// src/redux/slices/LocalidadSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  hasLoaded: false,
};

export const LocalidadesSlice = createSlice({
  name: "localidad",
  initialState,
  reducers: {
    setLocalidades: (state, action) => {
      action.payload.forEach((localidad) => {
        state.entities[localidad.id] = localidad;
      });
      state.hasLoaded = true;
    },
    addLocalidad: (state, action) => {
      const localidad = action.payload;
      state.entities[localidad.id] = localidad;
    },
    updateLocalidadEnStore: (state, action) => {
      const localidad = action.payload;
      if (state.entities[localidad.id]) {
        state.entities[localidad.id] = localidad;
      }
    },
    removeLocalidad: (state, action) => {
      delete state.entities[action.payload];
    },
  },
});

export const { setLocalidades, addLocalidad, updateLocalidadEnStore, removeLocalidad } = LocalidadesSlice.actions;

