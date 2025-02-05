import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  condicionesIva: [],
};

export const CondicionesIvaSlice = createSlice({
  name: "condicionesIva",
  initialState,
  reducers: {
    setCondicionesIva: (state, action) => {
      state.condicionesIva = action.payload;
    },

  },
});

export const {
  setCondicionesIva,
  addCondicionIva,
  updateCondicionIva,
} = CondicionesIvaSlice.actions;

