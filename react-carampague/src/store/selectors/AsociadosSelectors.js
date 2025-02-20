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
    return asociados
      .map((asociado) =>
        mapAsociadoRelations(
          asociado,
          barrios,
          localidades,
          provincias,
          tiposTelefonos,
          estadosCiviles,
          entregasRopa,
          documentaciones
        )
      )
      .sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA > nombreB) return 1;
        if (nombreA < nombreB) return -1;
        // Si los nombres son iguales, ordenamos por apellido
        const apellidoA = a.apellido.toLowerCase();
        const apellidoB = b.apellido.toLowerCase();
        if (apellidoA > apellidoB) return 1;
        if (apellidoA < apellidoB) return -1;
        return 0;
      });
  }
);

// Selector para obtener un asociado específico por ID con relaciones
export const makeSelectAsociadoById = (asociadoId) => createSelector(
  [selectAsociadosConRelaciones],
  (asociadosConRelaciones) =>
    asociadosConRelaciones.find(asociado => Number(asociado.id) === Number(asociadoId))
);
