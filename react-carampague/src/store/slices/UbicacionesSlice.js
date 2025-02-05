import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localidades: [],
  provincias: [],
  barrios: [],
};

export const UbicacionesSlice = createSlice({
  name: "ubicaciones",
  initialState,
  reducers: {
    setBarrios: (state, action) => {
      state.barrios = action.payload;
    },
    setLocalidades: (state, action) => {
      state.localidades = action.payload;
    },
    setProvincias: (state, action) => {
      state.provincias = action.payload;
    },
  },
});

export const {setBarrios, setLocalidades, setProvincias} = UbicacionesSlice.actions;
