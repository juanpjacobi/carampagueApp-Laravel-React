// src/redux/selectors/AsociadosSelectors.js

import { createSelector } from '@reduxjs/toolkit';
import { mapAsociadoRelations } from '../../components/utilities/mappers/mapAsociadoRelations';

// Selectores básicos
const selectAsociados = state => state.asociados.asociados;
const selectBarrios = state => state.ubicaciones.barrios;
const selectLocalidades = state => state.ubicaciones.localidades;
const selectProvincias = state => state.ubicaciones.provincias;
const selectTiposTelefonos = state => state.tiposTelefonos.tiposTelefonos;
const selecteEstadosCiviles = state => state.estadosCiviles.estadosCiviles;
const selectEntregasRopa = state => state.entregasRopa.entregasRopa; 
const selectDocumentaciones = state => state.documentacion.documentaciones; 

export const selectAsociadosConRelaciones = createSelector(
  [
    selectAsociados,
    selectBarrios,
    selectLocalidades,
    selectProvincias,
    selectTiposTelefonos,
    selecteEstadosCiviles,
    selectEntregasRopa,
    selectDocumentaciones,
  ],
  (asociados, barrios, localidades, provincias, tiposTelefonos, estadosCiviles, entregasRopa, documentaciones) => {
    return asociados.map((asociado) =>
      mapAsociadoRelations(asociado, barrios, localidades, provincias, tiposTelefonos, estadosCiviles, entregasRopa, documentaciones)
    );
  }
);

// Selector para obtener un asociado específico por ID con relaciones
export const makeSelectAsociadoById = (asociadoId) => createSelector(
  [selectAsociadosConRelaciones],
  (asociadosConRelaciones) =>
    asociadosConRelaciones.find(asociado => Number(asociado.id) === Number(asociadoId))
);



