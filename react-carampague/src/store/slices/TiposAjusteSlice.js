import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  tiposAjustes: {},   // Objeto indexado por id
  allIds: [],         // Arreglo de ids
  hasLoaded: false,
};

export const TiposAjustesSlice = createSlice({
  name: "tiposAjustes",
  initialState,
  reducers: {
    setTiposAjustes: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((tipo) => {
        newEntities[tipo.id] = tipo;
        newIds.push(tipo.id);
      });
      state.tiposAjustes = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addTipoAjuste: (state, action) => {
      const tipo = action.payload;
      state.tiposAjustes[tipo.id] = tipo;
      if (!state.allIds.includes(tipo.id)) {
        state.allIds.push(tipo.id);
      }
    },
    updateTipoAjusteEnStore: (state, action) => {
      const tipo = action.payload;
      if (state.tiposAjustes[tipo.id]) {
        state.tiposAjustes[tipo.id] = tipo;
      }
    },
    removeTipoAjuste: (state, action) => {
      const id = action.payload;
      delete state.tiposAjustes[id];
      state.allIds = state.allIds.filter((tipoId) => tipoId !== id);
    },
  },
});

export const { setTiposAjustes, addTipoAjuste, updateTipoAjusteEnStore, removeTipoAjuste } = TiposAjustesSlice.actions;




