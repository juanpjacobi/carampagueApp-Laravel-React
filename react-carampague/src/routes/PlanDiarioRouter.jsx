import { Route, Routes } from 'react-router-dom';
import { PlanDiario } from '../views';


export const PlanDiarioRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<PlanDiario />} />
        </Routes>
      );
}
