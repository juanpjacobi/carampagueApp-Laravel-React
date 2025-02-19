import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  hasLoaded: false,
};

export const RolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
      state.hasLoaded = true;
    },
    addRol: (state, action) => {
      state.roles.push(action.payload);
    },
    updateRolEnStore: (state, action) => {
      const updatedRol = action.payload;
      state.roles = state.roles.map((rol) =>
        rol.id === updatedRol.id ? updatedRol : rol
      );
    },
    removeRol: (state, action) => {
      state.roles = state.roles.filter((rol) => rol.id !== action.payload);
    },
  },
});

export const { setRoles, addRol, updateRolEnStore, removeRol } = RolesSlice.actions;
