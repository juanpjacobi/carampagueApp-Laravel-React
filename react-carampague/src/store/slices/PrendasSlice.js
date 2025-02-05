import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prendas: [],
  tiposPrendas: [],
  talles: [],
};

export const PrendasSlice = createSlice({
  name: "prendas",
  initialState,
  reducers: {
    setPrendas: (state, action) => {
      state.prendas = action.payload;
    },
    setTipoPrendas: (state, action) => {
      state.tiposPrendas = action.payload;
    },
    setTalles: (state, action) => {
        state.talles = action.payload;
      },
  },
});

export const { setPrendas, setTipoPrendas, setTalles } = PrendasSlice.actions;
