import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },

  },
});

export const {
  startLoading,
  setError,
  endLoading,
  clearErrors


} = UiSlice.actions
