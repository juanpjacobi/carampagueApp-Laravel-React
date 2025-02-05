import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  asociados: [],
  selectedAsociado: null,
  hasLoaded: false,

};

export const AsociadosSlice = createSlice({
  name: "asociados",
  initialState,
  reducers: {
    setAsociados: (state, action) => {
      state.asociados = action.payload;
      state.selectedAsociado = null;
      state.hasLoaded = true;
    },

    setSelectedAsociado: (state, action) => {
      state.selectedAsociado = action.payload;
    },
    addAsociado: (state, action) => {
      state.asociados.push(action.payload);
    },
    updateAsociadoEnStore: (state, action) => {
      const updatedAsociado = action.payload;
      const index = state.asociados.findIndex(
        (asociado) => asociado.id === updatedAsociado.id
      );
      if (index !== -1) {
        state.asociados[index] = updatedAsociado;
      }

    },
    removeAsociado: (state, action) => {
      delete state.entities[action.payload];
    },

    clearSelectedAsociado: (state) => {
      state.selectedAsociado = null;
    },

  },
});

export const {
  setAsociados,
  setSelectedAsociado,
  addAsociado,
  updateAsociadoEnStore,
  removeAsociado,
  clearSelectedAsociado,

} = AsociadosSlice.actions;
