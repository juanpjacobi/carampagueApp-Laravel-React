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

    addNewObjetivo: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    setSelectedObjetivo: (state, action) => {
      state.selectedObjetivo = action.payload;
    },
    setUpdatedObjetivo: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setObjetivos,
  setSelectedObjetivo,
  addNewObjetivo,
  setUpdatedObjetivo

} = ObjetivosSlice.actions
