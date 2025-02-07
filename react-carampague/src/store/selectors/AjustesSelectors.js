// src/store/selectors/AjustesSelectors.js

import { createSelector } from "@reduxjs/toolkit";
import { selectAllTiposAjustes } from "./TiposAjustesSelectors";

// Selector que retorna el estado completo del slice de ajustes
export const selectAjustesState = (state) => state.ajustes;

// Selector memoizado que retorna un arreglo con todos los ajustes (desnormalizados)
export const selectAllAjustes = createSelector(
  selectAjustesState,
  (ajustesState) => {
    const { ajustes, allIds } = ajustesState;
    return allIds.map((id) => ajustes[id]);
  }
);

/**
 * Para obtener un ajuste específico por ID, se recomienda crear un selector de fábrica.
 * Esto es porque cuando se pasan parámetros dinámicos (como el ID) se debe generar una instancia
 * del selector para cada parámetro.
 */
export const makeSelectAjusteById = () =>
  createSelector(
    selectAjustesState,
    (_, id) => id,
    (ajustesState, id) => ajustesState.ajustes[id]
  );

  export const selectEnrichedAjustes = createSelector(
    [selectAllAjustes, selectAllTiposAjustes],
    (ajustes, tiposAjustesState) => {
      const tiposMap = tiposAjustesState.tiposAjustes;
      return ajustes.map((ajuste) => ({
        ...ajuste,
        // Se agrega la información completa del tipo a partir del ID
        tipo_ajuste: tiposMap[ajuste.tipo_ajuste_id] || null,
      }));
    }
  );
