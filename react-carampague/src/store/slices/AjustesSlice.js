import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
  ajustes: {},   // Objeto indexado por id
  allIds: [],    // Arreglo de ids
  hasLoaded: false,
};

export const AjustesSlice = createSlice({
  name: "ajustes",
  initialState,
  reducers: {
    setAjustes: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((ajuste) => {
        newEntities[ajuste.id] = ajuste;
        newIds.push(ajuste.id);
      });
      state.ajustes = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addAjuste: (state, action) => {
      const ajuste = action.payload;
      state.ajustes[ajuste.id] = ajuste;
      if (!state.allIds.includes(ajuste.id)) {
        state.allIds.push(ajuste.id);
      }
    },
    updateAjusteEnStore: (state, action) => {
      const ajuste = action.payload;
      if (state.ajustes[ajuste.id]) {
        state.ajustes[ajuste.id] = ajuste;
      }
    },
    removeAjuste: (state, action) => {
      const id = action.payload;
      delete state.ajustes[id];
      state.allIds = state.allIds.filter((ajusteId) => ajusteId !== id);
    },
  },
});

export const { setAjustes, addAjuste, updateAjusteEnStore, removeAjuste } = AjustesSlice.actions;


