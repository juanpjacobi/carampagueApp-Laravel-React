import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  asociados: [],
  selectedAsociado: null,

};

export const AsociadosSlice = createSlice({
  name: "asociado",
  initialState,
  reducers: {
 
    setAsociados: (state, action) => {
      state.asociados = action.payload;
      state.selectedAsociado = null;
    },

    addNewAsociado: (state, action) => {
      state.error = null;
      state.isLoading = false;
    },
    
    setSelectedAsociado: (state, action) => {
      state.selectedAsociado = action.payload;
    },
    setUpdatedAsociado: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    setToggledAsociado(state, action) {
      const updatedAsociado = action.payload;
      const index = state.asociados.findIndex(
        (asociado) => asociado.id === updatedAsociado.id
      );
      if (index !== -1) {
        state.asociados[index] = updatedAsociado;
      }
      if (state.selectedAsociado && state.selectedAsociado.id === updatedAsociado.id) {
        state.selectedAsociado = updatedAsociado;
      }
    },
  },
});

export const {
  setAsociados,
  addNewAsociado,
  setSelectedAsociado,
  setUpdatedAsociado,
  setToggledAsociado
} = AsociadosSlice.actions;
