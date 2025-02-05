// src/redux/slices/ValoresSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  valores: [],
  hasLoaded: false,

};

export const valoresSlice = createSlice({
  name: 'valores',
  initialState,
  reducers: {
    setValores: (state, action) => {
      state.valores = action.payload;
      state.hasLoaded = true;
    },
    addValor: (state, action) => {
      state.valores.push(action.payload);
    },
    updateValorEnStore: (state, action) => {
      const updatedValor = action.payload;
      const index = state.valores.findIndex(
        (valor) => valor.id === updatedValor.id
      );
      if (index !== -1) {
        state.valores[index] = updatedValor;
      }
    },
    removeValorEnStore: (state, action) => {
      const valorId = action.payload;
      state.valores = state.valores.filter((valor) => valor.id !== valorId);
    },
  },
});

export const { setValores, addValor, updateValorEnStore, removeValorEnStore } = valoresSlice.actions;

export default valoresSlice.reducer;
