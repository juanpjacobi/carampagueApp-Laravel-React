import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { objetivoSchema } from "../utilities/validator/objetivo/objetivoSchema";

import {
  createObjetivo,
  updateObjetivo,
} from "../../store/thunks/ObjetivosThunks";
import DireccionForm from "../shared/direcciones/DireccionForm";
import { Alerta } from "../shared/Alerta";
import { ActivoToggle } from "../shared/estado/ActivoTogle";

export const ObjetivoForm = ({ editMode }) => {
  const { selectedObjetivo } = useSelector((state) => state.objetivos);
  const initialState = {
    nombre_objetivo: selectedObjetivo ? selectedObjetivo.nombre : "",
    valor_cliente: selectedObjetivo
      ? selectedObjetivo.valor.valor_cliente
      : null,
    valor_vigilador: selectedObjetivo
      ? selectedObjetivo.valor.valor_vigilador
      : null,
    cliente_id: selectedObjetivo ? selectedObjetivo.cliente.id : null,
    activo: selectedObjetivo ? selectedObjetivo.activo : null,
    calle: selectedObjetivo ? selectedObjetivo.direccion.calle : "",
    numeracion: selectedObjetivo ? selectedObjetivo.direccion.numeracion : "",
    piso: selectedObjetivo ? selectedObjetivo.direccion.piso : "",
    departamento: selectedObjetivo
      ? selectedObjetivo.direccion.departamento
      : "",
      provincia_id: selectedObjetivo
      ? selectedObjetivo.barrio.localidad.provincia_id.toString()
      : null,
    localidad_id: selectedObjetivo
      ? selectedObjetivo.direccion.barrio.localidad_id.toString()
      : null,
    barrio_id: selectedObjetivo ? selectedObjetivo.direccion.barrio_id.toString() : "",

  };
  const { clientes } = useSelector((state) => state.clientes);


  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedObjetivo && editMode) {
      navigate("/objetivos");
    }

  }, []);

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateObjetivo(selectedObjetivo.id, formik.values, navigate));
      return;
    }
    dispatch(createObjetivo(formik.values, navigate));
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: objetivoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="text-gray-700 text-sm text-center">
        <span>Los campos marcados con * son obligatorios</span>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="nombre_objetivo">
          Nombre del objetivo*
        </label>

        <input
          type="text"
          id="nombre_objetivo"
          className="mt-2 w-full p-3 bg-gray-200"
          name="nombre_objetivo"
          placeholder="Ingresa el nombre del objetivo"
          onChange={formik.handleChange}
          value={formik.values.nombre_objetivo ?? ""}
        />
        {formik.errors.nombre_objetivo ? (
          <Alerta error={formik.errors.nombre_objetivo} />
        ) : null}
      </div>
      <ActivoToggle formik={formik}/>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="cliente_id">
          Cliente*
        </label>
        <select
          name="cliente_id"
          id="cliente_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.cliente_id ?? ""}
        >
          <option value="">Seleccione uno</option>
          {clientes?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.razon_social}
            </option>
          ))}
        </select>
        {formik.errors.cliente_id ? (
          <Alerta error={formik.errors.cliente_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_cliente">
          Valor de la hora para el cliente*
        </label>
        <input
          type="number"
          id="valor_cliente"
          className="mt-2 w-full p-3 bg-gray-200"
          name="valor_cliente"
          placeholder="Ingresa el valor hora para el cliente"
          onChange={formik.handleChange}
          value={formik.values.valor_cliente ?? ""}
        />
        {formik.errors.valor_cliente ? (
          <Alerta error={formik.errors.valor_cliente} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_vigilador">
          Valor de la hora para el vigilador*
        </label>
        <input
          type="number"
          id="valor_vigilador"
          className="mt-2 w-full p-3 bg-gray-200"
          name="valor_vigilador"
          placeholder="Ingresa el valor hora para el vigilador"
          onChange={formik.handleChange}
          value={formik.values.valor_vigilador ?? ""}
        />
        {formik.errors.valor_vigilador ? (
          <Alerta error={formik.errors.valor_vigilador} />
        ) : null}
      </div>
      <DireccionForm formik={formik} />

      <input
        type="submit"
        value={editMode ? "Actualizar objetivo" : "Crear objetivo"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
