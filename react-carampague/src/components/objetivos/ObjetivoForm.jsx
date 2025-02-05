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

export const ObjetivoForm = ({ editMode, initialData }) => {
  const { clientes } = useSelector((state) => state.clientes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    nombre_objetivo: initialData ? initialData.nombre: "",
    cliente_id: initialData ? initialData.cliente_id : "",
    activo: initialData ? initialData.activo : false,
    calle: initialData ? initialData.direccion.calle : "",
    numeracion: initialData ? initialData.direccion.numeracion : "",
    piso: initialData ? initialData.direccion.piso : "",
    departamento: initialData ? initialData.direccion.departamento : "",
    provincia_id: initialData ? initialData.direccion.provincia_id : "",
    localidad_id: initialData ? initialData.direccion.localidad_id : "",
    barrio_id: initialData ? initialData.direccion.barrio_id : "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: objetivoSchema,
    enableReinitialize: true, 
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      if (editMode) {
        dispatch(updateObjetivo(initialData.id, formik.values, navigate));
        return;
      }
      dispatch(createObjetivo(formik.values, navigate));
    },
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
      <ActivoToggle formik={formik} />
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