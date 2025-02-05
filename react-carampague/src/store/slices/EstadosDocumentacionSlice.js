
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  estadosDocumentacion: [],
};

export const EstadosDocumentacionSlice = createSlice({
  name: 'estadosDocumentacion',
  initialState,
  reducers: {
    setEstadosDocumentacion: (state, action) => {
      state.estadosDocumentacion = action.payload;
    },
  },
});

export const { setEstadosDocumentacion } = EstadosDocumentacionSlice.actions;
