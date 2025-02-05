import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiposTelefonos: [],
};

export const TiposTelefonosSlice = createSlice({
  name: "tiposTelefonos",
  initialState,
  reducers: {
    setTiposTelefonos: (state, action) => {
      state.tiposTelefonos = action.payload;
    },

  },
});

export const {
setTiposTelefonos
} = TiposTelefonosSlice.actions;

