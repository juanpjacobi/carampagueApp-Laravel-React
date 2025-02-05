
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  hasLoaded: false,
};

export const BarriosSlice = createSlice({
  name: "barrio",
  initialState,
  reducers: {
    setBarrios: (state, action) => {
      action.payload.forEach((barrio) => {
        state.entities[barrio.id] = barrio;
      });
      state.hasLoaded = true;
    },
    addBarrio: (state, action) => {
      const barrio = action.payload;
      state.entities[barrio.id] = barrio;
    },
    updateBarrioEnStore: (state, action) => {
      const barrio = action.payload;
      if (state.entities[barrio.id]) {
        state.entities[barrio.id] = barrio;
      }
    },
    removeBarrio: (state, action) => {
      delete state.entities[action.payload];
    },
  },
});

export const { setBarrios, addBarrio, updateBarrioEnStore, removeBarrio } = BarriosSlice.actions;

