import { Route, Routes } from 'react-router-dom';
import { ActualizarCliente, Clientes, CrearCliente, CrearValor, EditarValor, Valores, VerCliente } from '../views';



export const ClienteRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Clientes />} />
          <Route path="/crear" element={<CrearCliente />} />
          <Route path="/:id" element={<VerCliente />} />
          <Route path="/edit/:id" element={<ActualizarCliente />} />
          <Route path="/valores/:id" element={<Valores />} />
          <Route path="/valores/edit/:clienteId/:valorId" element={<EditarValor />} />
          <Route path="/crear-valor/:id" element={<CrearValor />} />
        </Routes>
      );
}
