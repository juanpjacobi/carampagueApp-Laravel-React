import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clientes: [],
  selectedCliente: null,
  hasLoaded: false,


};

export const ClientesSlice = createSlice({
  name: "cliente",
  initialState,
  reducers: {
 
    setClientes: (state, action) => {
      state.clientes = action.payload.clientes;
      state.selectedCliente = null;
      state.hasLoaded = true; 

    },


    addClienteEnStore: (state, action) => {
      state.clientes.push(action.payload);
    },
    
    updateClienteEnStore: (state, action) => {
      const updatedCliente = action.payload;
      const index = state.clientes.findIndex(
        (cliente) => cliente.id === updatedCliente.id
      );
      if (index !== -1) {
        state.clientes[index] = updatedCliente;
      }

    },

    removeClienteEnStore: (state, action) => {
      const clienteId = action.payload; 
      state.clientes = state.clientes.filter((cli) => cli.id !== clienteId);
    },

  },
});

export const {
  setClientes,
  setSelectedCliente,
  addClienteEnStore,
  clearSelectedCliente,
  updateClienteEnStore, 
  removeClienteEnStore
} = ClientesSlice.actions;
