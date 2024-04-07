import { configureStore } from "@reduxjs/toolkit";
import {ClientesSlice} from "./slices/clientes/ClientesSlice";

export const store = configureStore({
  reducer: { 
    clientes: ClientesSlice.reducer,
    
},
});
