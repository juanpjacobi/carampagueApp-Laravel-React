// src/store/slices/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Información del usuario. null significa "cargado y sin usuario"
  token: localStorage.getItem("AUTH_TOKEN") || null,
  loading: false, // Flag para indicar si se está cargando la info del usuario
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("AUTH_TOKEN", action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("AUTH_TOKEN");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setToken, clearAuth, setLoading, setError, resetError } = AuthSlice.actions;
