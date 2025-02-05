import { Route, Routes } from 'react-router-dom';
import { ActualizarServicio, Cobertura, CrearServicio, Servicios, VerServicio } from '../views';


export const ServicioRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Servicios />} />
          <Route path="/:id" element={<VerServicio />} />
          <Route path="/crear" element={<CrearServicio />} />
          <Route path="/edit/:id" element={<ActualizarServicio />} />

          <Route path="/cobertura/:id" element={<Cobertura />} />


        </Routes>
      );
}
