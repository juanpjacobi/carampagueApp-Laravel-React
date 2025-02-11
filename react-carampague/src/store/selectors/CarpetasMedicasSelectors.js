
import { createSelector } from "@reduxjs/toolkit";

// Selector que retorna el estado completo del slice de ajustes
export const selectCarpetasMedicas = (state) => state.carpetasMedicas;

// Selector memoizado que retorna un arreglo con todos los ajustes (desnormalizados)
export const selectAllCarpetasMedicas = createSelector(
    selectCarpetasMedicas,
  (carpetasState) => {
    const { carpetas, allIds } = carpetasState;
    return allIds.map((id) => carpetas[id]);
  }
);


