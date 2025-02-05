// src/redux/slices/ObjetivosSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objetivos: [],
  hasLoaded: false,
};

export const ObjetivosSlice = createSlice({
  name: "objetivos",
  initialState,
  reducers: {
    setObjetivos: (state, action) => {
      state.objetivos = action.payload.objetivos;
      state.hasLoaded = true;
    },
    addObjetivoEnStore: (state, action) => {
      state.objetivos.push(action.payload);
    },
    updateObjetivoEnStore: (state, action) => {
      const updatedObjetivo = action.payload;
      const index = state.objetivos.findIndex(
        (objetivo) => objetivo.id === updatedObjetivo.id
      );
      if (index !== -1) {
        state.objetivos[index] = updatedObjetivo;
      }
    },
    // Elimina setSelectedObjetivo si ya no es necesario
    removeObjetivoEnStore: (state, action) => {
      const objetivoId = action.payload;
      state.objetivos = state.objetivos.filter((obj) => obj.id !== objetivoId);
    },
  },
});

export const {
  setObjetivos,
  addObjetivoEnStore,
  updateObjetivoEnStore,
  removeObjetivoEnStore,
} = ObjetivosSlice.actions;

export default ObjetivosSlice.reducer;
