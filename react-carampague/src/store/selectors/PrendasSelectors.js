import { createSelector } from '@reduxjs/toolkit';

const selectPrendasEntities = (state) => state.prendas.prendas;
const selectTiposPrendasEntities = (state) => state.prendas.tiposPrendas;
const selectTallesEntities = (state) => state.prendas.talles;

export const selectEnrichedPrendas = createSelector(
  [selectPrendasEntities, selectTiposPrendasEntities, selectTallesEntities],
  (prendas, tiposPrendas, talles) => {
    return prendas.map((prenda) => {
      const tipo = tiposPrendas.find((t) => t.id === prenda.tipo_prenda_id);
      const talle = talles.find((t) => t.id === prenda.talle_id);
      return {
        ...prenda,
        tipo_prenda: tipo,
        talle: talle,
      };
    });
  }
);

export const selectSortedPrendas = createSelector(
  [selectEnrichedPrendas],
  (prendas) => {
    return [...prendas].sort((a, b) => {
      if (a.tipo_prenda?.id < b.tipo_prenda?.id) return -1;
      if (a.tipo_prenda?.id > b.tipo_prenda?.id) return 1;
      return (a.talle?.id || 0) - (b.talle?.id || 0);
    });
  }
);
