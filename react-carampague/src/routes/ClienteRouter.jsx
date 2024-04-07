import { Route, Routes } from 'react-router-dom';
import { ActualizarCliente, Clientes, CrearCliente, VerCliente } from '../views';


export const ClienteRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Clientes />} />
          <Route path="/crear" element={<CrearCliente />} />
          <Route path="/:id" element={<VerCliente />} />
          <Route path="/edit/:id" element={<ActualizarCliente />} />
        </Routes>
      );
}
