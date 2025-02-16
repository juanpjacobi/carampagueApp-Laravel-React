import { createSelector } from "@reduxjs/toolkit";
import { mapObjetivoRealations } from "../../components/utilities/mappers/mapObjetivoRelations";

export const selectObjetivos = state => state.objetivos.objetivos;
const selectClientes = state => state.clientes.clientes;
const selectBarrios = state => state.ubicaciones.barrios;
const selectLocalidades = state => state.ubicaciones.localidades;
const selectProvincias = state => state.ubicaciones.provincias;

export const selectObjetivosConRelaciones = createSelector(
  [selectObjetivos, selectClientes, selectBarrios, selectLocalidades, selectProvincias],
  (objetivos, clientes, barrios, localidades, provincias) => {
    return objetivos.map(objetivo => mapObjetivoRealations(objetivo, barrios, localidades, provincias, clientes));
  }
);

export const makeSelectObjetivoById = (objetivoId) => createSelector(
    [selectObjetivosConRelaciones],
    (objetivosConRelaciones) => objetivosConRelaciones.find(obj => obj.id === objetivoId)
  );