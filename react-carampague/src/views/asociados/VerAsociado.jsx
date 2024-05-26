import  { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AsociadoCard } from "../../components/asociados/AsociadoCard";
import { getAsociado } from "../../store/thunks/AsociadosThunks";


export const VerAsociado = () => {
  const { id } = useParams();
  const {isLoading} = useSelector((state) => state.ui);
  const {selectedAsociado} = useSelector((state) => state.asociados);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAsociado(id));
  }, [dispatch]);

  return (
    <>
      {!isLoading ? (
        <AsociadoCard selectedAsociado={selectedAsociado}/>
      ) : (
        <Spinner />
      )}
    </>
  );
};
