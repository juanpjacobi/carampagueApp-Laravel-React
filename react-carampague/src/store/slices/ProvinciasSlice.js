
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  hasLoaded: false,
};

export const ProvinciasSlice = createSlice({
  name: "provincia",
  initialState,
  reducers: {
    setProvincias: (state, action) => {
      action.payload.forEach((provincia) => {
        state.entities[provincia.id] = provincia;
      });
      state.hasLoaded = true;
    },
    addProvincia: (state, action) => {
      const provincia = action.payload;
      state.entities[provincia.id] = provincia;
    },
    updateProvinciaEnStore: (state, action) => {
      const provincia = action.payload;
      if (state.entities[provincia.id]) {
        state.entities[provincia.id] = provincia;
      }
    },
    removeProvincia: (state, action) => {
      delete state.entities[action.payload];
    },
  },
});

export const { setProvincias, addProvincia, updateProvinciaEnStore, removeProvincia } = ProvinciasSlice.actions;

