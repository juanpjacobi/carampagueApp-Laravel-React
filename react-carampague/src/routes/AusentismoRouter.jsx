import { Route, Routes } from "react-router-dom";
import {

  Ausentismo,

} from "../views";

export const AusentismoRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<Ausentismo />} />


    </Routes>
  );
};
