import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clientes: [],
  selectedCliente: null,

};

export const ClientesSlice = createSlice({
  name: "cliente",
  initialState,
  reducers: {
 
    setClientes: (state, action) => {
      state.clientes = action.payload;
      state.selectedCliente = null;
    },

    setSelectedCliente: (state, action) => {
      state.selectedCliente = action.payload;
    },

  },
});

export const {
  setClientes,
  setSelectedCliente,
} = ClientesSlice.actions;
