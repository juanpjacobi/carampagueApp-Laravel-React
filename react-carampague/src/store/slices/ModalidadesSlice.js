
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalidades: {}, // Objeto indexado por id
  allIds: [],
  hasLoaded: false,
};

export const ModalidadesSlice = createSlice({
  name: "modalidades",
  initialState,
  reducers: {
    setModalidades: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((modalidad) => {
        newEntities[modalidad.id] = modalidad;
        newIds.push(modalidad.id);
      });
      state.modalidades = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addModalidad: (state, action) => {
      const modalidad = action.payload;
      state.modalidades[modalidad.id] = modalidad;
      if (!state.allIds.includes(modalidad.id)) {
        state.allIds = [...state.allIds, modalidad.id];
      }
    },
    updateModalidadEnStore: (state, action) => {
      const modalidad = action.payload;
      if (state.modalidades[modalidad.id]) {
        state.modalidades[modalidad.id] = modalidad;
      }
    },
    removeModalidad: (state, action) => {
      const id = action.payload;
      delete state.modalidades[id];
      state.allIds = state.allIds.filter((modalidadId) => modalidadId !== id);
    },
  },
});

export const { setModalidades, addModalidad, updateModalidadEnStore, removeModalidad } = ModalidadesSlice.actions;
