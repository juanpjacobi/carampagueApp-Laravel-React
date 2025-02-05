
import { createSelector } from '@reduxjs/toolkit';
import { mapLineaEntregaRopa } from '../../components/utilities/mappers/mapLineaEntregaRopa';

const selectPrendas = state => state.prendas.prendas;
const selectTiposPrendas = state => state.prendas.tiposPrendas;
const selectTalles = state => state.prendas.talles;


// Selector para obtener el objeto de lineas de entrega de ropa indexado por ID
const selectLineasEntregaRopaById = (state) => state.lineasEntregaRopa.lineas;

// Selector para obtener todos los IDs de lineas de entrega de ropa
const selectLineasEntregaRopaAllIds = (state) => state.lineasEntregaRopa.allIds;



// Selector para obtener todas las lineas de entrega de ropa como un array
export const selectAllLineasEntregaRopa = createSelector(
  [selectLineasEntregaRopaById, selectLineasEntregaRopaAllIds],
  (lineasById, allIds) => allIds.map(id => lineasById[id])
);

// Selector para obtener las lineas de una entrega de ropa específica por ID
export const makeSelectLineasByEntregaRopaId = (entregaRopaId) => createSelector(
  [
    (state) => state.entregasRopa.entregasRopa[entregaRopaId]?.lineas_ids || [],
    selectLineasEntregaRopaById
  ],
  (lineasIds, lineasById) => lineasIds.map(id => lineasById[id]).filter(linea => linea !== undefined)
);

export const makeSelectLineasEnriquecidasByEntregaRopaId = (entregaRopaId) => createSelector(
  [
    // Seleccionar las líneas de la entrega específica. Supongamos que la entrega tiene una propiedad `lineas_ids`
    (state) => {
      // Primero, obtenemos la entrega de ropa usando el slice de entregas
      const entrega = state.entregasRopa.entregasRopa[entregaRopaId];
      return entrega ? entrega.lineas_ids : [];
    },
    selectAllLineasEntregaRopa,
    selectPrendas,
    selectTiposPrendas,
    selectTalles
  ],
  (lineasIds, allLineas, prendas, tiposPrendas, talles) => {
    // Filtrar las líneas que pertenezcan a esta entrega y enriquecerlas
    const lineasParaEntrega = allLineas.filter(linea => lineasIds.includes(linea.id));
    return lineasParaEntrega.map(linea => mapLineaEntregaRopa(linea, prendas, tiposPrendas, talles));
  }
);
