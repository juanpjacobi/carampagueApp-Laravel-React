
import { createSelector } from "@reduxjs/toolkit";

export const selectFacturas = (state) => state.facturas;

// Selector memoizado que retorna un arreglo con todos los ajustes (desnormalizados)
export const selectAllFacturas = createSelector(
    selectFacturas,
  (facturasState) => {
    const { facturas, allIds } = facturasState;
    return allIds.map((id) => facturas[id]);
  }
);


