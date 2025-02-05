
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tiposDocumentacion: [],
};

export const TiposDocumentacionSlice = createSlice({
  name: 'tiposDocumentacion',
  initialState,
  reducers: {
    setTiposDocumentacion: (state, action) => {
      state.tiposDocumentacion = action.payload;
    },
  },
});

export const { setTiposDocumentacion } = TiposDocumentacionSlice.actions;
