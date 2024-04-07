import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clientes: [],
  selectedCliente: null,
  isLoading: false,
  error: null,
};

export const ClientesSlice = createSlice({
  name: "cliente",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setClientes: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.clientes = action.payload;
      state.selectedCliente = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addNewCliente: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    setSelectedCliente: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.selectedCliente = action.payload;
    },
    setUpdateCliente: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setClientes,
  startLoading,
  setError,
  addNewCliente,
  setSelectedCliente,
  setUpdateCliente
} = ClientesSlice.actions
