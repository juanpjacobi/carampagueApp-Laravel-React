import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getTiposTelefono } from "../../functions/TipoTelefono/tipoTelefono";
import { getCondicionesIva } from "../../functions/CondicionIva/condicionIva";
import { clienteSchema } from "../utilities/validator/cliente/clienteSchema";

import {
  createCliente,
  updateCliente,
} from "../../store/thunks/ClientesThunks";
import DireccionForm from "../shared/direcciones/DireccionForm";
import { Alerta } from "../shared/Alerta";
import { ActivoToggle } from "../shared/estado/ActivoTogle";

export const ClienteForm = ({ editMode }) => {
  const { selectedCliente } = useSelector((state) => state.clientes);
  const initialState = {
    razon_social: selectedCliente ? selectedCliente.razon_social : "",
    cuit_cliente: selectedCliente ? selectedCliente.cuit_cliente : null,
    email: selectedCliente ? selectedCliente.email : "",
    condicion_iva_id: selectedCliente ? selectedCliente.condicion_iva.id : null,
    numero_telefono: selectedCliente
      ? selectedCliente.telefono.numero_telefono
      : "",
    tipo_telefono_id: selectedCliente
      ? selectedCliente.telefono.tipo_telefono_id
      : null,
    activo: selectedCliente ? selectedCliente.activo : null,
    calle: selectedCliente ? selectedCliente.direccion.calle : "",
    numeracion: selectedCliente ? selectedCliente.direccion.numeracion : "",
    piso: selectedCliente ? selectedCliente.direccion.piso : "",
    departamento: selectedCliente ? selectedCliente.direccion.departamento : "",
    provincia_id: selectedCliente
      ? selectedCliente.barrio.localidad.provincia_id.toString()
      : null,
    localidad_id: selectedCliente
      ? selectedCliente.direccion.barrio.localidad_id.toString()
      : null,
    barrio_id: selectedCliente
      ? selectedCliente.direccion.barrio_id.toString()
      : "",
  };

  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [condicionesIva, setCondicionesIva] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedCliente && editMode) {
      navigate("/clientes");
    }
    loadTiposTelefonos();
    loadCondicionesIva();
  }, []);

  const loadTiposTelefonos = async () => {
    const { data } = await getTiposTelefono();

    setTiposTelefono(data.tipos_telefonos);
  };
  const loadCondicionesIva = async () => {
    const { data } = await getCondicionesIva();
    setCondicionesIva(data.condiciones_iva);
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateCliente(selectedCliente.id, formik.values, navigate));
      return;
    }
    dispatch(createCliente(formik.values, navigate));
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: clienteSchema,
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
        <label className="text-slate-800" htmlFor="razon_social">
          Razon social*
        </label>
        <input
          type="text"
          id="razon_social"
          className="mt-2 w-full p-3 bg-gray-200"
          name="razon_social"
          placeholder="Ingresa la razon social del cliente"
          onChange={formik.handleChange}
          value={formik.values.razon_social ?? ""}
        />
        {formik.errors.razon_social ? (
          <Alerta error={formik.errors.razon_social} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="cuit_cliente">
          Cuit*
        </label>
        <input
          type="number"
          id="cuit_cliente"
          className="mt-2 w-full p-3 bg-gray-200"
          name="cuit_cliente"
          placeholder="Ingresa el cuit del cliente"
          onChange={formik.handleChange}
          value={formik.values.cuit_cliente ?? ""}
        />
        {formik.errors.cuit_cliente ? (
          <Alerta error={formik.errors.cuit_cliente} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="email">
          Email*
        </label>
        <input
          type="email"
          id="email"
          className="mt-2 w-full p-3 bg-gray-200"
          name="email"
          placeholder="Ingresa el cuit del cliente"
          onChange={formik.handleChange}
          value={formik.values.email ?? ""}
        />
        {formik.errors.email ? <Alerta error={formik.errors.email} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="condicion_iva_id">
          Condicion frente al IVA*
        </label>
        <select
          name="condicion_iva_id"
          id="condicion_iva_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.condicion_iva_id ?? ""}
        >
          <option value=""> Seleccione uno</option>
          {condicionesIva?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        {formik.errors.condicion_iva_id ? (
          <Alerta error={formik.errors.condicion_iva_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numero_telefono">
          Numero de telefono*
        </label>
        <input
          type="text"
          id="numero_telefono"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numero_telefono"
          placeholder="Ingresa el numero de telefono del cliente"
          onChange={formik.handleChange}
          value={formik.values.numero_telefono ?? ""}
        />
        {formik.errors.numero_telefono ? (
          <Alerta error={formik.errors.numero_telefono} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="tipo_telefono_id">
          Tipo de telefono*
        </label>
        <select
          name="tipo_telefono_id"
          id="tipo_telefono_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.tipo_telefono_id ?? ""}
        >
          <option value="">Seleccione uno</option>
          {tiposTelefono?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
        {formik.errors.tipo_telefono_id ? (
          <Alerta error={formik.errors.tipo_telefono_id} />
        ) : null}
      </div>
      <ActivoToggle formik={formik} />
      <DireccionForm formik={formik} />

      <input
        type="submit"
        value={editMode ? "Actualizar cliente" : "Crear cliente"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
