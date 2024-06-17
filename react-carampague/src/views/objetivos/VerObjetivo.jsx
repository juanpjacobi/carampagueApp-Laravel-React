import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getObjetivo } from "../../store/thunks/ObjetivosThunks";
import { ObjetivoCard } from "../../components/objetivos/ObjetivoCard";

export const VerObjetivo = () => {
  const { id } = useParams();
  const {isLoading} = useSelector((state) => state.ui);
  const {selectedObjetivo} = useSelector((state) => state.objetivos);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getObjetivo(id));

  }, [dispatch]);

  return (
    <>
      {!isLoading ? (
        <ObjetivoCard selectedObjetivo={selectedObjetivo}/>
      ) : (
        <Spinner />
      )}
    </>
  );
};
