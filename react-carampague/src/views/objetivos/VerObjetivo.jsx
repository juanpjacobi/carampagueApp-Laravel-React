import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {   useSelector } from "react-redux";
import { ObjetivoCard } from "../../components/objetivos/ObjetivoCard";
import { makeSelectObjetivoById } from "../../store/selectors/ObjetivosSelectors";
import { NotFound } from "../../components/shared/NotFound";

export const VerObjetivo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const objetivoId = parseInt(id, 10);

  const selectObjetivo = useMemo(() => makeSelectObjetivoById(objetivoId), [objetivoId]);
  const objetivo = useSelector(selectObjetivo);


  useEffect(() => {
    if ( !objetivo) {
      navigate("/objetivos");
    }
  }, [ objetivo, navigate]);


  if (!objetivo) {
    return <NotFound message={"No se encuentra un objetivo con ese id"} />;
  }

  return <ObjetivoCard selectedObjetivo={objetivo} />;
};
