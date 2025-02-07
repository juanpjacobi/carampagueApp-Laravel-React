import { createSelector } from "@reduxjs/toolkit";


// Selector que retorna el estado completo del slice de tipos de ajustes
export const selectTiposAjustesState = (state) => state.tiposAjustes;

// Selector memoizado que retorna un objeto con { tiposAjustes, allIds }
export const selectAllTiposAjustes = createSelector(
  [selectTiposAjustesState],
  (tiposAjustesState) => {
    const { tiposAjustes, allIds } = tiposAjustesState;
    return { tiposAjustes, allIds };
  }
);

// Selector memoizado para obtener un tipo de ajuste específico por su ID.
// Se usa un selector de fábrica para permitir pasar el parámetro 'id'
export const makeSelectTipoAjusteById = () =>
  createSelector(
    [selectTiposAjustesState, (_, id) => id],
    (tiposAjustesState, id) => tiposAjustesState.tiposAjustes[id]
  );
