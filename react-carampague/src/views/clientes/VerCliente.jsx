import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components/utilities/spinners/Spinner";
import { getCliente } from "../../store/slices/thunks/ClientesThunks";
import { useDispatch, useSelector } from "react-redux";
import { ClienteCard } from "../../components/clientes/ClienteCard";

export const VerCliente = () => {
  const { id } = useParams();
  const {isLoading} = useSelector((state) => state.clientes);
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
