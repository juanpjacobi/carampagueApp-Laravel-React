import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { ClienteCard } from "../../components/clientes/ClienteCard";
import { getCliente } from "../../store/thunks/ClientesThunks";

export const VerCliente = () => {
  const { id } = useParams();
  const {isLoading} = useSelector((state) => state.ui);
  const {selectedCliente} = useSelector((state) => state.clientes);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCliente(id));

  }, [dispatch]);

  return (
    <>
      {!isLoading ? (
        <ClienteCard selectedCliente={selectedCliente}/>
      ) : (
        <Spinner />
      )}
    </>
  );
};
