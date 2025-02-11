import { Route, Routes } from 'react-router-dom';
import { CarpetasMedicas } from '../views/carpetas_medicas/CarpetasMedicas';


export const CarpetasMedicasRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<CarpetasMedicas />} />
        </Routes>
      );
}
