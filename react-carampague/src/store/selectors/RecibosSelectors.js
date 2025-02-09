
import { createSelector } from "@reduxjs/toolkit";

// Selector que retorna el estado completo del slice de ajustes
export const selectRecibos = (state) => state.recibos;

// Selector memoizado que retorna un arreglo con todos los ajustes (desnormalizados)
export const selectAllRecibos = createSelector(
    selectRecibos,
  (recibosState) => {
    const { recibos, allIds } = recibosState;
    return allIds.map((id) => recibos[id]);
  }
);


