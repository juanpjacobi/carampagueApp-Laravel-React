
import { createSelector } from '@reduxjs/toolkit';
import { mapClienteRelations } from '../../components/utilities/mappers/mapClienteRelations';

const selectClientes = state => state.clientes.clientes;
const selectBarrios = state => state.ubicaciones.barrios;
const selectLocalidades = state => state.ubicaciones.localidades;
const selectProvincias = state => state.ubicaciones.provincias;
const selectTiposTelefonos = state => state.tiposTelefonos.tiposTelefonos;
const selectCondicionesIva = state => state.condicionesIva.condicionesIva;


export const selectClientesConRelaciones = createSelector(
  [
    selectClientes,
    selectBarrios,
    selectLocalidades,
    selectProvincias,
    selectTiposTelefonos,
    selectCondicionesIva
  ],
  (clientes, barrios, localidades, provincias, tiposTelefonos, condicionesIva) => {
    return clientes.map((cliente) =>
      mapClienteRelations(cliente, barrios, localidades, provincias, tiposTelefonos, condicionesIva)
    );
  }
);


export const makeSelectClienteById = (clienteId) => createSelector(
  [selectClientesConRelaciones],
  (clientesConRelaciones) => clientesConRelaciones.find(cliente => cliente.id === clienteId)
);
