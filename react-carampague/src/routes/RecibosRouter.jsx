import { Route, Routes } from 'react-router-dom';
import { Recibos } from '../views/recibos/Recibos';


export const RecibosRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Recibos />} />
        </Routes>
      );
}
