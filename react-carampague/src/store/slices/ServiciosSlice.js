import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  entities: {},       // Objeto indexado por id
  allIds: [],         // Array de IDs
  selectedServicio: null,
  hasLoaded: false,
};

export const ServiciosSlice = createSlice({
  name: "servicios",
  initialState,
  reducers: {
    setServicios: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((servicio) => {
        newEntities[servicio.id] = servicio;
        newIds.push(servicio.id);
      });
      state.entities = newEntities;
      state.allIds = newIds;
      state.selectedServicio = null;
      state.hasLoaded = true;
    },

    addServicioEnStore: (state, action) => {
      const servicio = action.payload;
      state.entities[servicio.id] = servicio;
      if (!state.allIds.includes(servicio.id)) {
        state.allIds = [...state.allIds, servicio.id];
      }
    },

    setSelectedServicio: (state, action) => {
      state.selectedServicio = action.payload;
    },

    updateServicioEnStore: (state, action) => {
      const updatedServicio = action.payload;
      if (state.entities[updatedServicio.id]) {
        state.entities[updatedServicio.id] = updatedServicio;
      }
    },
   
    clearSelectedServicio: (state) => {
      state.selectedServicio = null;
    },


    
  },
});

export const { 
  setServicios,
  updateLineaEnStore,
  addLineaEnStore,
  addServicioEnStore,
  updateServicioEnStore
} = ServiciosSlice.actions;