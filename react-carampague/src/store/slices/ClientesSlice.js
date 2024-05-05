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

    addNewCliente: (state, action) => {
      // state.clientes.push(action.payload)
      state.error = null;
      state.isLoading = false;
    },
    setSelectedCliente: (state, action) => {
      state.selectedCliente = action.payload;
    },
    setUpdatedCliente: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setClientes,
  addNewCliente,
  setSelectedCliente,
  setUpdatedCliente,
} = ClientesSlice.actions;
