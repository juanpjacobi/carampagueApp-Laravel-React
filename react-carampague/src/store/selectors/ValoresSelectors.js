
import { createSelector } from '@reduxjs/toolkit';
import { mapValorRelations } from '../../components/utilities/mappers/mapvalorRelations';

const selectValores = (state) => state.valores.valores;
const selectClientes = (state) => state.clientes.clientes;
const selectObjetivos = (state) => state.objetivos.objetivos;

export const selectValoresConRelaciones = createSelector(
  [selectValores, selectClientes, selectObjetivos],
  (valores, clientes, objetivos) => {
    return valores.map((valor) =>
      mapValorRelations(valor, clientes, objetivos)
    );
  }
);


export const makeSelectValorById = (valorId) => createSelector(
  [selectValoresConRelaciones],
  (valoresConRelaciones) => valoresConRelaciones.find(valor => valor.id === valorId)
);


