import { makeSelectLineasDocumentacionByDocumentacionId } from "./LineasDocumentacionSelectors";
import { createSelector } from "@reduxjs/toolkit";

const selectDocumentacionesById = (state) => state.documentacion.documentaciones;
const selectDocumentacionAllIds = (state) => state.documentacion.allIds;

export const selectAllDocumentaciones = createSelector(
  [selectDocumentacionesById, selectDocumentacionAllIds],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean)
);


export const makeSelectDocumentacionByAsociado = (documentacionId) => createSelector(
    [selectAllDocumentaciones],
    (documentaciones) => documentaciones.find((doc) => Number(doc.id) === Number(documentacionId))
  );

export const makeSelectDocumentacionConLineasByAsociadoId = (asociadoId) => createSelector(
  [
    makeSelectDocumentacionByAsociadoId(asociadoId),
    (state) => state
  ],
  (documentacion, state) => {
    if (!documentacion) return null;
    const lineas = makeSelectLineasDocumentacionByDocumentacionId(documentacion.id)(state);
    return { ...documentacion, lineas_documentacion: lineas };
  }
);

export const makeSelectDocumentacionConLineasByAsociado = (documentacionId) => createSelector(
    [
      makeSelectDocumentacionByAsociado(documentacionId),
      (state) => state
    ],
    (documentacion, state) => {
      if (!documentacion) return null;
      // Aquí, documentacion.lineas_ids es el array de IDs que vienen del backend.
      const lineas = makeSelectLineasDocumentacionByIds(documentacion.lineas_ids)(state);
      return { ...documentacion, lineas_documentacion: lineas };
    }
  );

  export const makeSelectDocumentacionById = (documentacionId) => createSelector(
    [selectAllDocumentaciones],
    (documentaciones) =>
      documentaciones.find((doc) => Number(doc.id) === Number(documentacionId))
  );


export const makeSelectDocumentacionConLineasByDocumentacionId = (documentacionId) => createSelector(
  [
    makeSelectDocumentacionById(documentacionId),
    (state) => state
  ],
  (documentacion, state) => {
    if (!documentacion) return null;
    const lineas = makeSelectLineasDocumentacionByDocumentacionId(documentacion.id)(state);
    return { ...documentacion, lineas_documentacion: lineas };
  }
);

export const makeSelectDocumentacionByAsociadoId = (asociadoId) =>
  createSelector(
    [
      (state) => {
        const asociados = state.asociados.asociados;
        return asociados.find((a) => Number(a.id) === Number(asociadoId));
      },
      selectAllDocumentaciones,
    ],
    (asociado, documentaciones) => {
      if (!asociado) return null;
      return documentaciones.find(
        (doc) => Number(doc.id) === Number(asociado.documentacion_id)
      );
    }
  );



