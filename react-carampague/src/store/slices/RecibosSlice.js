import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recibos: {},   
  allIds: [],   
  hasLoaded: false,

};

export const RecibosSlice = createSlice({
  name: 'recibos',
  initialState,
  reducers: {
    setRecibos: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((recibo) => {
        newEntities[recibo.id] = recibo;
        newIds.push(recibo.id);
      });
      state.recibos = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addRecibo: (state, action) => {
      const recibo = action.payload;
      state.recibos[recibo.id] = recibo;
      if (!state.allIds.includes(recibo.id)) {
        state.allIds.push(recibo.id);
      }
    },
    updateReciboInStore: (state, action) => {
      const recibo = action.payload;
      if (state.recibos[recibo.id]) {
        state.recibos[recibo.id] = recibo;
      }
    },
    removeRecibo: (state, action) => {
      const id = action.payload;
      delete state.recibos[id];
      state.allIds = state.allIds.filter(reciboId => reciboId !== id);
    },

  },
});

export const { setRecibos, addRecibo, updateReciboInStore, removeRecibo } = RecibosSlice.actions;
