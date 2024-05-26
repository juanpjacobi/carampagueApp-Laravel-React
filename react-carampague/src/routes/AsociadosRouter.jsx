import { Route, Routes } from 'react-router-dom';
import { Asociados, CrearAsociado, VerAsociado } from '../views';
import { ActualizarAsociado } from '../views/asociados/ActualizarAsociado';


export const AsociadosRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Asociados />} />
          <Route path="/crear" element={<CrearAsociado />} />
          <Route path="/:id" element={<VerAsociado />} />
          <Route path="/edit/:id" element={<ActualizarAsociado />} />
        </Routes>
      );
}
