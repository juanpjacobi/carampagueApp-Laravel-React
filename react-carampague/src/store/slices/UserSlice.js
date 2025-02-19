import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  hasLoaded: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.hasLoaded = true;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserInStore: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUserInStore, removeUser } = UserSlice.actions;
