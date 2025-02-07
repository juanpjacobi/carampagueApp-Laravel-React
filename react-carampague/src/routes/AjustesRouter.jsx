import { Route, Routes } from 'react-router-dom';
import { Ajustes } from '../views/ajustes/Ajustes';


export const AjustesRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Ajustes />} />
        </Routes>
      );
}
