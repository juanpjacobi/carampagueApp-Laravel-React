import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carpetas: {}, // Objeto indexado por id: { [id]: carpeta_medica }
  allIds: [], // Array de ids
};

export const CarpetasMedicasSlice = createSlice({
  name: "carpetasMedicas",
  initialState,
  reducers: {
    setCarpetasMedicas: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((carpeta) => {
        newEntities[carpeta.id] = carpeta;
        newIds.push(carpeta.id);
      });
      state.carpetas = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addCarpetaMedica: (state, action) => {
      const carpeta = action.payload;
      state.carpetas[carpeta.id] = carpeta;
      if (!state.allIds.includes(carpeta.id)) {
        state.allIds.push(carpeta.id);
      }
    },
    updateCarpetaMedica: (state, action) => {
      const carpeta = action.payload;
      if (state.carpetas[carpeta.id]) {
        state.carpetas[carpeta.id] = carpeta;
      }
    },
    removeCarpetaMedica: (state, action) => {
      const id = action.payload;
      delete state.carpetas[id];
      state.allIds = state.allIds.filter((carpetaId) => carpetaId !== id);
    },
  },
});

export const {
  setCarpetasMedicas,
  addCarpetaMedica,
  updateCarpetaMedica,
  removeCarpetaMedica,
} = CarpetasMedicasSlice.actions;
