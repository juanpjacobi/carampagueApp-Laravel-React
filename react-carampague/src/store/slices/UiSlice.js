import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isInitialLoading: false,
  error: null,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {

    startInitialLoading: (state) => {
      state.isInitialLoading = true;
    },
    endInitialLoading: (state) => {
      state.isInitialLoading = false;
    },
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
  clearErrors,
  startInitialLoading, 
  endInitialLoading
} = UiSlice.actions
