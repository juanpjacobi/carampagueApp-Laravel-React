// src/redux/selectors/LineasDocumentacionSelectors.js
import { createSelector } from "@reduxjs/toolkit";

const selectLineasDocumentacionById = (state) => state.lineasDocumentacion.lineas;
const selectLineasDocumentacionAllIds = (state) => state.lineasDocumentacion.allIds;

export const selectAllLineasDocumentacion = createSelector(
  [selectLineasDocumentacionById, selectLineasDocumentacionAllIds],
  (lineas, ids) => ids.map((id) => lineas[id]).filter(Boolean)
);

export const makeSelectLineasDocumentacionByIds = (ids) => createSelector(
  [selectLineasDocumentacionById],
  (lineas) => ids.map((id) => lineas[id]).filter(Boolean)
);

export const makeSelectLineaDocumentacionById = (lineaId) => createSelector(
  [(state) => state.lineasDocumentacion.lineas],
  (lineas) => lineas[Number(lineaId)]
);


// Suponiendo que cada línea tiene la propiedad documentacion_id
export const makeSelectLineasDocumentacionByDocumentacionId = (documentacionId) => createSelector(
  [selectAllLineasDocumentacion],
  (lineas) => lineas.filter((linea) => Number(linea.documentacion_id) === Number(documentacionId))
);
