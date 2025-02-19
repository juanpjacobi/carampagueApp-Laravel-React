import { createSelector } from '@reduxjs/toolkit';


const selectRolesEntities = (state) => state.roles.roles; 

export const selectAllRoles = createSelector(
  [selectRolesEntities],
  (roles) => roles ? [...roles] : []
);