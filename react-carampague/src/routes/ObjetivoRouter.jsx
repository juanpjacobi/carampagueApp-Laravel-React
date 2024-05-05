import { Route, Routes } from "react-router-dom";
import { ActualizarObjetivo, CrearObjetivo, Objetivos, VerObjetivo } from "../views";


export const ObjetivoRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Objetivos />} />
      <Route path="/crear" element={<CrearObjetivo />} />
      <Route path="/:id" element={<VerObjetivo />} />
      <Route path="/edit/:id" element={<ActualizarObjetivo />} />

    </Routes>
  );
};
