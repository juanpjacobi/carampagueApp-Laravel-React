// src/store/slices/PrendasSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prendas: [],
  tiposPrendas: [],
  talles: [],
};

export const PrendasSlice = createSlice({
  name: "prendas",
  initialState,
  reducers: {
    setPrendas: (state, action) => {
      state.prendas = action.payload;
    },
    setTipoPrendas: (state, action) => {
      state.tiposPrendas = action.payload;
    },
    setTalles: (state, action) => {
      state.talles = action.payload;
    },
    addPrenda: (state, action) => {
      state.prendas.push(action.payload);
    },
    updatePrendaInStore: (state, action) => {
      const updatedPrenda = action.payload;
      const index = state.prendas.findIndex((p) => p.id === updatedPrenda.id);
      if (index !== -1) {
        state.prendas[index] = updatedPrenda;
      }
    },
    addTipoPrenda: (state, action) => {
      state.tiposPrendas.push(action.payload);
    },
    addTalle: (state, action) => {
      state.talles.push(action.payload);
    },
  },
});

export const { setPrendas, setTipoPrendas, setTalles, addPrenda, updatePrendaInStore, addTipoPrenda, addTalle } = PrendasSlice.actions;

export default PrendasSlice.reducer;
