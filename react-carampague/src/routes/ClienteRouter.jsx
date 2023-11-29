import { Route, Routes } from 'react-router-dom';
import { Clientes } from '../views/clientes/Clientes';
import { CrearCliente } from '../views/clientes/CrearCliente';
import { VerCliente } from '../views/clientes/VerCliente';

export const ClienteRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Clientes />} />
          <Route path="/crear" element={<CrearCliente />} />
          <Route path="/:id" element={<VerCliente />} />

        </Routes>
      );
}
