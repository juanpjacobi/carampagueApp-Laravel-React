import { configureStore } from "@reduxjs/toolkit";
import {ClientesSlice} from "./slices/ClientesSlice";
import { ObjetivosSlice } from "./slices/ObjetivosSlice";
import { UiSlice } from "./slices/UiSlice";
import { AsociadosSlice } from "./slices/AsociadosSlice";

export const store = configureStore({
  reducer: { 
    clientes: ClientesSlice.reducer,
    objetivos: ObjetivosSlice.reducer,
    asociados: AsociadosSlice.reducer,
    ui: UiSlice.reducer
    
},
});
