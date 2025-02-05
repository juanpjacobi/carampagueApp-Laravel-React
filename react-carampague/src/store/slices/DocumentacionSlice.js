
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentaciones: {}, // Objeto indexado por id
  allIds: [],          // Array de ids
  hasLoaded: false,
};

export const DocumentacionSlice = createSlice({
  name: "documentacion",
  initialState,
  reducers: {
    setDocumentacion: (state, action) => {
      action.payload.forEach(documentacion => {
        state.documentaciones[documentacion.id] = documentacion;
        if (!state.allIds.includes(documentacion.id)) {
          state.allIds.push(documentacion.id);
        }
      });
      state.hasLoaded = true;
    },
    addDocumentacion: (state, action) => {
      const doc = action.payload;
      state.documentaciones[doc.id] = doc;
      if (!state.allIds.includes(doc.id)) {
        state.allIds = [...state.allIds, doc.id];
      }
    },
    updateDocumentacionEnStore: (state, action) => {
      const doc = action.payload;
      if (state.documentaciones[doc.id]) {
        state.documentaciones[doc.id] = doc;
      }
    },
    removeDocumentacion: (state, action) => {
      const id = action.payload;
      delete state.documentaciones[id];
      state.allIds = state.allIds.filter((docId) => docId !== id);
    },
  },
});

export const { setDocumentacion, addDocumentacion, updateDocumentacionEnStore, removeDocumentacion } = DocumentacionSlice.actions;

