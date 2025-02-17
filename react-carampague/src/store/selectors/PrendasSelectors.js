import { createSelector } from '@reduxjs/toolkit';

// Selectores base (suponiendo que tus slices tienen arrays para prendas, tiposPrendas y talles)
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
        tipo_prenda: tipo,  // Agregamos la información completa del tipo
        talle: talle,       // Agregamos la información completa del talle
      };
    });
  }
);
