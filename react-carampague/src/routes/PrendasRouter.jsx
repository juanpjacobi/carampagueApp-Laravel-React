import { Route, Routes } from "react-router-dom";
import { Prendas } from "../views";


export const PrendasRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Prendas />} />
    </Routes>
  );
};
