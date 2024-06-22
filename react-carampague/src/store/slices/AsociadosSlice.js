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
    },

    setSelectedAsociado: (state, action) => {
      state.selectedAsociado = action.payload;
    },

  },
});

export const {
  setAsociados,
  setSelectedAsociado,
} = AsociadosSlice.actions;
