
import { createSelector } from '@reduxjs/toolkit';

// Selector para obtener el objeto de entregas de ropa indexado por ID
const selectEntregasRopaById = (state) => state.entregasRopa.entregasRopa;

// Selector para obtener todos los IDs de entregas de ropa
const selectEntregasRopaAllIds = (state) => state.entregasRopa.allIds;

// Selector para verificar si las entregas han sido cargadas
export const selectEntregasRopaLoaded = (state) => state.entregasRopa.hasLoaded;

// Selector para obtener todas las entregas de ropa como un array
export const selectAllEntregasRopa = createSelector(
  [selectEntregasRopaById, selectEntregasRopaAllIds],
  (entregasRopaById, allIds) => allIds.map(id => entregasRopaById[id])
);

export const makeSelectEntregaRopaById = (entregaRopaId) => createSelector(
    [selectEntregasRopaById],
    (entregasRopaById) => entregasRopaById[entregaRopaId]
  );

export const makeSelectEntregasRopaByAsociado = (asociadoId) => createSelector(
  [selectAllEntregasRopa],
  (entregasRopa) => entregasRopa.filter(entrega => 
    Number(entrega.asociado_id) === parseInt(asociadoId, 10)
  )
);


