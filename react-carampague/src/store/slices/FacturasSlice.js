import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  facturas: {},   
  allIds: [],  
  hasLoaded: false,
};

export const FacturasSlice = createSlice({
  name: "facturas",
  initialState,
  reducers: {
    setFacturas: (state, action) => {
      const newEntities = {};
      const newIds = [];
      action.payload.forEach((factura) => {
        newEntities[factura.id] = factura;
        newIds.push(factura.id);
      });
      state.facturas = newEntities;
      state.allIds = newIds;
      state.hasLoaded = true;
    },
    addFactura: (state, action) => {
      const factura = action.payload;
      state.facturas[factura.id] = factura;
      if (!state.allIds.includes(factura.id)) {
        state.allIds.push(factura.id);
      }
    },
    updateFacturaEnStore: (state, action) => {
      const factura = action.payload;
      if (state.facturas[factura.id]) {
        state.facturas[factura.id] = factura;
      }
    },
    removeFactura: (state, action) => {
      const id = action.payload;
      delete state.facturas[id];
      state.allIds = state.allIds.filter((facturaId) => facturaId !== id);
    },
  },
});

export const { setFacturas, addFactura, updateFacturaEnStore, removeFactura } = FacturasSlice.actions;


