import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  objetivos: [],
  selectedObjetivo: null,
};

export const ObjetivosSlice = createSlice({
  name: "objetivos",
  initialState,
  reducers: {

    setObjetivos: (state, action) => {
      state.objetivos = action.payload;
      state.selectedObjetivo = null;
    },

    setSelectedObjetivo: (state, action) => {
      state.selectedObjetivo = action.payload;
    },
 
  },
});

export const {
  setObjetivos,
  setSelectedObjetivo,


} = ObjetivosSlice.actions
