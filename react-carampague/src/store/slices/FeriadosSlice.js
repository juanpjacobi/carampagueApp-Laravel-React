import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feriados: [],
  hasLoaded: false,
};

export const FeriadosSlice = createSlice({
  name: "feriados",
  initialState,
  reducers: {
    setFeriados: (state, action) => {
      state.feriados = action.payload;
      state.hasLoaded = true;
    },
  },
});

export const { setFeriados } = FeriadosSlice.actions;
