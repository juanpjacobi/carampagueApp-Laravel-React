import { createSelector } from '@reduxjs/toolkit';

export const selectMotivosEntities = (state) => state.motivos.motivos; // asumiendo que el slice se llama "motivos" y tiene "motivos" en entities

export const makeSelectMotivosByLineaId = (lineaId) =>
  createSelector(
    [selectMotivosEntities],
    (motivosEntities) => {
      // Convertimos el objeto a arreglo y filtramos por la propiedad "linea_servicio_id"
      return Object.values(motivosEntities).filter(
        (motivo) => Number(motivo.linea_servicio_id) === Number(lineaId)
      );
    }
  );
