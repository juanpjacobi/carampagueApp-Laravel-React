import { Route, Routes } from 'react-router-dom';
import { Facturas } from '../views/facturas/Facturas';
import { AllFacturas } from '../views/facturas/AllFacturas';


export const FacturasRouter = () => {
    return (
        <Routes>
          <Route path="/diagramas" element={<Facturas />} />
          <Route path="/all" element={<AllFacturas />} />

        </Routes>
      );
}
