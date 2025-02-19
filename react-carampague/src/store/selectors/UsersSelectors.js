import { createSelector } from '@reduxjs/toolkit';

const selectUsersEntities = (state) => state.users.users;
const selectRolesEntities = (state) => state.roles.roles; 

export const selectEnrichedUsers = createSelector(
  [selectUsersEntities, selectRolesEntities],
  (users, roles) => {
    return users.map((user) => {
      const role = roles.find((r) => r.id === user.rol_id);
      return {
        ...user,
        rol: role, 
        activo: user.activo === 1 || user.activo === "1" || user.activo === true
      };
    });
  }
);
