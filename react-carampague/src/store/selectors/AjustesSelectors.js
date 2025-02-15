// src/store/selectors/AjustesSelectors.js

import { createSelector } from "@reduxjs/toolkit";
import { selectAllTiposAjustes } from "./TiposAjustesSelectors";

// Selector que retorna el estado completo del slice de ajustes
export const selectAjustesState = (state) => state.ajustes;
export const selectAllAsociados = (state) => state.asociados;


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
    [
      selectAllAjustes,
      selectAllTiposAjustes,
      // Suponemos que el slice de asociados tiene la propiedad "asociados" que es un arreglo
      (state) => state.asociados.asociados 
    ],
    (ajustes, tiposAjustesState, asociados) => {
      const tiposMap = tiposAjustesState.tiposAjustes;
      return ajustes.map((ajuste) => ({
        ...ajuste,
        // Buscamos en el arreglo de asociados aquel cuyo id coincida con ajuste.asociado_id
        asociado: asociados.find(
          (a) => String(a.id) === String(ajuste.asociado_id)
        ) || null,
        tipo_ajuste: tiposMap[ajuste.tipo_ajuste_id] || null,
      }));
    }
  );