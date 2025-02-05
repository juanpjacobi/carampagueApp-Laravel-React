import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tiposMotivos: [], 
  hasLoaded: false,
};

export const TiposMotivosSlice = createSlice({
  name: "tiposMotivos",
  initialState,
  reducers: {
    setTiposMotivos: (state, action) => {
      state.tiposMotivos = action.payload;
      state.hasLoaded = true;
    },
  },
});

export const { setTiposMotivos } = TiposMotivosSlice.actions;
