import { configureStore } from "@reduxjs/toolkit";
import {ClientesSlice} from "./slices/ClientesSlice";
import { ObjetivosSlice } from "./slices/ObjetivosSlice";
import { UiSlice } from "./slices/UiSlice";

export const store = configureStore({
  reducer: { 
    clientes: ClientesSlice.reducer,
    objetivos: ObjetivosSlice.reducer,
    ui: UiSlice.reducer
    
},
});
