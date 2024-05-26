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
  },
});

export const {
  setAsociados,
  addNewAsociado,
  setSelectedAsociado,
  setUpdatedAsociado,
} = AsociadosSlice.actions;
