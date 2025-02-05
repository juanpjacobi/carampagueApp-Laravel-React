import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  motivos: {},   // Objeto indexado por id
  allIds: [],    // Arreglo de ids
  hasLoaded: false,
};

export const MotivosSlice = createSlice({
  name: "motivos",
  initialState,
  reducers: {
    setMotivos: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((motivo) => {
        newEntities[motivo.id] = motivo;
        newIds.push(motivo.id);
      });
      state.motivos = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addMotivo: (state, action) => {
      const motivo = action.payload;
      state.motivos[motivo.id] = motivo;
      if (!state.allIds.includes(motivo.id)) {
        state.allIds = [...state.allIds, motivo.id];
      }
    },
    updateMotivoEnStore: (state, action) => {
      const motivo = action.payload;
      if (state.motivos[motivo.id]) {
        state.motivos[motivo.id] = motivo;
      }
    },
    removeMotivo: (state, action) => {
      const id = action.payload;
      delete state.motivos[id];
      state.allIds = state.allIds.filter((motivoId) => motivoId !== id);
    },
    removeMotivosByLineaId: (state, action) => {
      const lineaId = action.payload;
      // Iteramos sobre los IDs existentes y eliminamos aquellos cuyo motivo
      // tenga linea_servicio_id igual a lineaId.
      state.allIds = state.allIds.filter((motivoId) => {
        if (state.motivos[motivoId]?.linea_servicio_id === Number(lineaId)) {
          delete state.motivos[motivoId];
          return false;
        }
        return true;
      });
    },
  },
});

export const { setMotivos, addMotivo, updateMotivoEnStore, removeMotivo, removeMotivosByLineaId } = MotivosSlice.actions;
