import { Route, Routes } from "react-router-dom";
import {
  ActualizarAsociado,
  Asociados,
  Ausentismo,
  CrearAsociado,
  DocumentacionAsociado,
  EditarDocumentacion,
  EditarEntregaRopa,
  EntregaRopa,
  RegistrarDocumentacionAsociado,
  RegistrarEntregaRopa,
  VerAsociado,
  VerDocumentacion,
  VerEntregaRopa,
} from "../views";

export const AsociadosRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Asociados />} />
      <Route path="/crear" element={<CrearAsociado />} />
      <Route path="/:id" element={<VerAsociado />} />
      <Route path="/edit/:id" element={<ActualizarAsociado />} />
      <Route path="/documentacion/:id" element={<DocumentacionAsociado />} />
      <Route
        path="/:asociadoId/documentacion/crear"
        element={<RegistrarDocumentacionAsociado />}
      />
      <Route path="/documentacion/detalle/:id" element={<VerDocumentacion />} />
      <Route path="/documentacion/edit/:lineaId" element={<EditarDocumentacion />} />
      <Route path="/:id/entrega-ropa/" element={<EntregaRopa />} />
      <Route path="/:id/entrega-ropa/crear" element={<RegistrarEntregaRopa />} />
      <Route path="/entrega-ropa/edit/:id" element={<EditarEntregaRopa />} />

      <Route path="/entrega-ropa/detalle/:id" element={<VerEntregaRopa />} />
      <Route path="/ausentismo" element={<Ausentismo />} />


    </Routes>
  );
};
