import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estadosCiviles: [],
};

export const EstadosCivilesSlice = createSlice({
  name: "estadosCiviles",
  initialState,
  reducers: {
    setEstadosCiviles: (state, action) => {
      state.estadosCiviles = action.payload;
    },
    addEstadoCivil: (state, action) => {
      state.estadosCiviles.push(action.payload);
    },
    updateEstadoCivilEnStore: (state, action) => {
      const index = state.estadosCiviles.findIndex(
        (estado) => estado.id === action.payload.id
      );
      if (index !== -1) {
        state.estadosCiviles[index] = action.payload;
      }
    },
  },
});

export const {
    setEstadosCiviles,
    addEstadoCivil,
    updateEstadoCivilEnStore,
} = EstadosCivilesSlice.actions;

