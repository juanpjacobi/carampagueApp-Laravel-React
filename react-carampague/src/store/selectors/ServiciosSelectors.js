import { createSelector } from "@reduxjs/toolkit";

const selectServiciosEntities = (state) => state.servicios.entities;
const selectServiciosAllIds = (state) => state.servicios.allIds;
const selectModalidadesEntities = (state) => state.modalidades.modalidades;
const selectModalidadesAllIds = (state) => state.modalidades.allIds;
const selectObjetivos = (state) => state.objetivos.objetivos;
const selectLineasServicioEntities = (state) => state.lineasServicio.entities;
const selectLineasServicioAllIds = (state) => state.lineasServicio.allIds;

export const selectAllLineasServicio = createSelector(
  [selectLineasServicioEntities, selectLineasServicioAllIds],
  (entities, allIds) => allIds.map(id => entities[id]).filter(Boolean)
);


export const selectAllServicios = createSelector(
  [selectServiciosEntities, selectServiciosAllIds],
  (entities, allIds) => allIds.map((id) => entities[id]).filter(Boolean)
);

const selectAllModalidades = createSelector(
  [selectModalidadesEntities, selectModalidadesAllIds],
  (entities, allIds) => allIds.map((id) => entities[id]).filter(Boolean)
);

export const makeSelectServicioById = (servicioId) =>
  createSelector(
    [selectServiciosEntities],
    (entities) => entities[Number(servicioId)]
  );

  export const makeSelectServicioEnriquecidoById = (servicioId) =>
    createSelector(
      [selectServiciosEntities, selectObjetivos, selectAllModalidades],
      (serviciosEntities, objetivos, modalidades) => {
        const servicio = serviciosEntities[Number(servicioId)];
        if (!servicio) return null;
        
        // Buscamos el objetivo por servicio.objetivo_id
        const objetivo = objetivos.find(
          (obj) => Number(obj.id) === Number(servicio.objetivo_id)
        );
        
        const modalidadesEnriquecidas = servicio.modalidades_ids
          ? servicio.modalidades_ids
              .map((modId) =>
                modalidades.find((mod) => Number(mod.id) === Number(modId))
              )
              .filter(Boolean)
          : [];
  
        return {
          ...servicio,
          objetivo,
          modalidades: modalidadesEnriquecidas,
        };
      }
    );

    
    export const makeSelectLineasServicioByServicioId = (servicioId) =>
      createSelector(
        [selectAllLineasServicio],
        (lineas) => lineas.filter((linea) => Number(linea.servicio_id) === Number(servicioId))
      );