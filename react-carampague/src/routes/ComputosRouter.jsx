import { Route, Routes } from 'react-router-dom';
import { Computos } from '../views/computos/Computos';


export const ComputosRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Computos />} />
        </Routes>
      );
}
