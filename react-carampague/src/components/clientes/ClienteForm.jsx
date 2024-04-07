import React, { useEffect, useState } from "react";
import ModalLocalidad from "./ModalLocalidad";
import { getTiposTelefono } from "../../functions/TipoTelefono/tipoTelefono";
import { getCondicionesIva } from "../../functions/CondicionIva/condicionIva";
import { getProvincias } from "../../functions/Provincia/provincia";
import { getLocalidades } from "../../functions/Localidad/localidad";
import { getEstados } from "../../functions/Estado/estado";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCliente, updateCliente } from "../../store/slices/thunks/ClientesThunks";
import { clienteSchema } from "../utilities/validator/cliente/clienteSchema";
import { Alerta } from "../Alerta";

export const ClienteForm = ({editMode}) => {
  const {selectedCliente} = useSelector((state) => state.clientes)
  const initialState = {
    razon_social: selectedCliente ? selectedCliente.razon_social : "",
    cuit_cliente: selectedCliente ? selectedCliente.cuit_cliente : null,
    email: selectedCliente ? selectedCliente.email : "",
    condicion_iva_id:selectedCliente ? selectedCliente.condicion_iva.id : null,
    numero_telefono: selectedCliente ? selectedCliente.telefono.numero_telefono : "",
    tipo_telefono_id: selectedCliente ? selectedCliente.telefono.tipo_telefono_id : null,
    estado_id: selectedCliente ? selectedCliente.estado.id : null,
    calle: selectedCliente ? selectedCliente.direccion.calle : "",
    numeracion: selectedCliente ? selectedCliente.direccion.numeracion : "",
    barrio:selectedCliente ? selectedCliente.direccion.barrio : "",
    piso: selectedCliente ? selectedCliente.direccion.piso :"",
    departamento:selectedCliente ? selectedCliente.direccion.departamento : "",
    localidad_id: selectedCliente ? selectedCliente.direccion.localidad_id : null,
  };

  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [condicionesIva, setCondicionesIva] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedCliente && editMode) {
      navigate('/clientes');
    }
    loadTiposTelefonos();
    loadCondicionesIva();
    loadProvincias();
    loadLocalidades();
    loadEstados();
  }, []);

  const loadTiposTelefonos = async () => {
    const { data } = await getTiposTelefono();

    setTiposTelefono(data.data);
  };
  const loadCondicionesIva = async () => {
    const { data } = await getCondicionesIva();

    setCondicionesIva(data.data);
  };

  const loadProvincias = async () => {
    const { data } = await getProvincias();

    setProvincias(data.data);
  };
  const loadLocalidades = async () => {
    const { data } = await getLocalidades();

    setLocalidades(data.data);
  };

  const loadEstados = async () => {
    const { data } = await getEstados();

    setEstados(data.data);
  };

  const handleSubmit = () => {
    if (editMode) {
      console.log(selectedCliente.id)
      dispatch(updateCliente(selectedCliente.id, formik.values, navigate))
      return;
    }
    dispatch(createCliente(formik.values, navigate));
    
  };

  const formik = useFormik({
    initialValues: initialState ,
    validationSchema: clienteSchema,
    validateOnChange:false,
     validateOnBlur:false,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="razon_social">
          Razon social
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
        { formik.errors.razon_social ? (
          <Alerta error={formik.errors.razon_social} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="cuit_cliente">
          Cuit
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
        { formik.errors.cuit_cliente ? (
          <Alerta error={formik.errors.cuit_cliente} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="email">
          Email
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
        {  formik.errors.email ? <Alerta error={formik.errors.email} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="condicion_iva_id">
          Condicion frente al IVA
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
        { formik.errors.condicion_iva_id ? (
          <Alerta error={formik.errors.condicion_iva_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numero_telefono">
          Numero de telefono
        </label>
        <input
          type="number"
          id="numero_telefono"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numero_telefono"
          placeholder="Ingresa el numero de telefono del cliente"
          onChange={formik.handleChange}
          value={formik.values.numero_telefono ?? ""}
        />
        { formik.errors.numero_telefono ? (
          <Alerta error={formik.errors.numero_telefono} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="tipo_telefono_id">
          Tipo de telefono
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
        {  formik.errors.tipo_telefono_id ? (
          <Alerta error={formik.errors.tipo_telefono_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_id">
          Estado del cliente
        </label>
        <select
          name="estado_id"
          id="estado_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.estado_id ?? ""}
        >
          <option value="">Seleccione uno</option>
          {estados?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        { formik.errors.estado_id ? (
          <Alerta error={formik.errors.estado_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="calle">
          Calle
        </label>
        <input
          type="text"
          id="calle"
          className="mt-2 w-full p-3 bg-gray-200"
          name="calle"
          placeholder="Ingresa la calle del cliente"
          onChange={formik.handleChange}
          value={formik.values.calle ?? ""}
        />
        { formik.errors.calle ? <Alerta error={formik.errors.calle} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numeracion">
          Numeracion
        </label>
        <input
          type="number"
          id="numeracion"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numeracion"
          placeholder="Ingresa la numeracion del cliente"
          onChange={formik.handleChange}
          value={formik.values.numeracion ?? ""}
        />
        { formik.errors.numeracion ? (
          <Alerta error={formik.errors.numeracion} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="barrio">
          Barrio
        </label>
        <input
          type="text"
          id="barrio"
          className="mt-2 w-full p-3 bg-gray-200"
          name="barrio"
          placeholder="Ingresa el barrio del cliente"
          onChange={formik.handleChange}
          value={formik.values.barrio ?? ""}
        />
        { formik.errors.barrio ? <Alerta error={formik.errors.barrio} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="piso">
          Piso
        </label>
        <input
          type="text"
          id="piso"
          className="mt-2 w-full p-3 bg-gray-200"
          name="piso"
          placeholder="Ingresa el piso del cliente"
          onChange={formik.handleChange}
          value={formik.values.piso ?? ""}
        />

        { formik.errors.piso ? <Alerta error={formik.errors.piso} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="departamento">
          Departamento
        </label>
        <input
          type="text"
          id="departamento"
          className="mt-2 w-full p-3 bg-gray-200"
          name="departamento"
          placeholder="Ingresa el departamento del cliente"
          onChange={formik.handleChange}
          value={formik.values.departamento ?? ""}
        />

        { formik.errors.departamento ? (
          <Alerta error={formik.errors.departamento} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="localidad_id">
          Localidad
        </label>
        <select
          name="localidad_id"
          id="localidad_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.localidad_id ?? ""}
        >
          <option value=""> Seleccione uno</option>
          {localidades?.map((l, i) => (
            <option key={i} value={l.id}>
              {l.nombre}
            </option>
          ))}
        </select>
        { formik.errors.localidad_id ? (
          <Alerta error={formik.errors.localidad_id} />
        ) : null}
        <p className="mt-2 text-slate-600">
          Si la localidad no existe puedes crear una clickeando{" "}
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="bg-sky-800 hover:bg-sky-950 text-white rounded-full p-2
        first-letter:uppercase font-bold cursor-pointer"
          >
            aqui
          </button>
        </p>
        <ModalLocalidad
          setShowModal={setShowModal}
          showModal={showModal}
          setLocalidades={setLocalidades}
          loadLocalidades={loadLocalidades}
          localidades={localidades}
          provincias={provincias}
        />
      </div>
      <input
        type="submit"
        value={editMode ? "Actualizar cliente" : "Crear cliente"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
