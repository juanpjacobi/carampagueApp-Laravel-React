import React, { useEffect, useState } from "react";
import { getTiposTelefono } from "../../functions/TipoTelefono/tipoTelefono";
import { getCondicionesIva } from "../../functions/CondicionIva/condicionIva";
import { getProvincias } from "../../functions/Provincia/provincia";
import { getLocalidades } from "../../functions/Localidad/localidad";
import { getEstados } from "../../functions/Estado/estado";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alerta } from "../Alerta";
import { getEstadosCiviles } from "../../functions/EstadoCivl/estadoCivil";
import {
  createAsociado,
  updateAsociado,
} from "../../store/thunks/AsociadosThunks";
import { asociadoSchema } from "../utilities/validator/asociado/asociadoSchema";

export const AsociadoForm = ({ editMode }) => {
  const {selectedAsociado} = useSelector((state) => state.asociados)

  const initialState = {
    nombre_asociado: selectedAsociado ? selectedAsociado.nombre : "",
    apellido_asociado: selectedAsociado ? selectedAsociado.apellido : null,
    numero_asociado: selectedAsociado ? selectedAsociado.numero_asociado : "",
    estado_civil_id: selectedAsociado ? selectedAsociado.estado_civil.id : null,
    cuit_asociado: selectedAsociado ? selectedAsociado.cuit_asociado : null,
    fecha_alta: selectedAsociado ? selectedAsociado.fecha_alta : null,
    fecha_nacimiento: selectedAsociado
      ? selectedAsociado.fecha_nacimiento
      : null,
    numero_telefono: selectedAsociado
      ? selectedAsociado.telefono.numero_telefono
      : "",
    tipo_telefono_id: selectedAsociado
      ? selectedAsociado.telefono.tipo_telefono_id
      : null,
    estado_id: selectedAsociado ? selectedAsociado.estado.id : null,
    calle: selectedAsociado ? selectedAsociado.direccion.calle : "",
    numeracion: selectedAsociado ? selectedAsociado.direccion.numeracion : "",
    barrio: selectedAsociado ? selectedAsociado.direccion.barrio : "",
    piso: selectedAsociado ? selectedAsociado.direccion.piso : "",
    departamento: selectedAsociado
      ? selectedAsociado.direccion.departamento
      : "",
    localidad_id: selectedAsociado
      ? selectedAsociado.direccion.localidad_id
      : null,
  };

  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [condicionesIva, setCondicionesIva] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedAsociado && editMode) {
      navigate("/asociados");
    }
    loadTiposTelefonos();
    loadCondicionesIva();
    loadProvincias();
    loadLocalidades();
    loadEstados();
    loadEstadosCiviles();
  }, []);

  const loadTiposTelefonos = async () => {
    const { data } = await getTiposTelefono();

    setTiposTelefono(data.data);
  };

  const loadEstadosCiviles = async () => {
    const { data } = await getEstadosCiviles();

    setEstadosCiviles(data.data);
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
      console.log(selectedAsociado.id);
      dispatch(updateAsociado(selectedAsociado.id, formik.values, navigate));
      return;
    }
    console.log(formik.values)
    dispatch(createAsociado(formik.values, navigate));
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: asociadoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="nombre_asociado">
          Nombre
        </label>
        <input
          type="text"
          id="nombre_asociado"
          className="mt-2 w-full p-3 bg-gray-200"
          name="nombre_asociado"
          placeholder="Ingresa el nombre del asociado"
          onChange={formik.handleChange}
          value={formik.values.nombre_asociado ?? ""}
        />
        {formik.errors.nombre_asociado ? (
          <Alerta error={formik.errors.nombre_asociado} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="apellido_asociado">
          Apellido
        </label>

        <input
          type="text"
          id="apellido_asociado"
          className="mt-2 w-full p-3 bg-gray-200"
          name="apellido_asociado"
          placeholder="Ingresa el nombre del asociado"
          onChange={formik.handleChange}
          value={formik.values.apellido_asociado ?? ""}
        />
        {formik.errors.apellido_asociado ? (
          <Alerta error={formik.errors.apellido_asociado} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numero_asociado">
          Numero de asociado
        </label>
        <input
          type="number"
          id="numero_asociado"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numero_asociado"
          placeholder="Ingresa el cuit del asociado"
          onChange={formik.handleChange}
          value={formik.values.numero_asociado ?? ""}
        />
        {formik.errors.numero_asociado ? (
          <Alerta error={formik.errors.numero_asociado} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="cuit_asociado">
          Cuit
        </label>
        <input
          type="number"
          id="cuit_asociado"
          className="mt-2 w-full p-3 bg-gray-200"
          name="cuit_asociado"
          placeholder="Ingresa el cuit del asociado"
          onChange={formik.handleChange}
          value={formik.values.cuit_asociado ?? ""}
        />
        {formik.errors.cuit_asociado ? (
          <Alerta error={formik.errors.cuit_asociado} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="fecha_nacimiento">
          Fecha de alta
        </label>
        <input
          type="date"
          id="fecha_nacimiento"
          className="mt-2 w-full p-3 bg-gray-200"
          name="fecha_nacimiento"
          placeholder="Ingresa el cuit del asociado"
          onChange={formik.handleChange}
          value={formik.values.fecha_nacimiento ?? ""}
        />
        {formik.errors.fecha_nacimiento ? <Alerta error={formik.errors.fecha_nacimiento} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="fecha_alta">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          id="fecha_alta"
          className="mt-2 w-full p-3 bg-gray-200"
          name="fecha_alta"
          placeholder="Ingresa el cuit del asociado"
          onChange={formik.handleChange}
          value={formik.values.fecha_alta ?? ""}
        />
        {formik.errors.fecha_alta ? <Alerta error={formik.errors.fecha_alta} /> : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_civil_id">
          Estado civil
        </label>
        <select
          name="estado_civil_id"
          id="estado_civil_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.estado_civil_id ?? ""}
        >
          <option value=""> Seleccione uno</option>
          {estadosCiviles?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        {formik.errors.estado_civil_id ? (
          <Alerta error={formik.errors.estado_civil_id} />
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
          placeholder="Ingresa el numero de telefono del asociado"
          onChange={formik.handleChange}
          value={formik.values.numero_telefono ?? ""}
        />
        {formik.errors.numero_telefono ? (
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
        {formik.errors.tipo_telefono_id ? (
          <Alerta error={formik.errors.tipo_telefono_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_id">
          Estado del asociado
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
        {formik.errors.estado_id ? (
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
          placeholder="Ingresa la calle del asociado"
          onChange={formik.handleChange}
          value={formik.values.calle ?? ""}
        />
        {formik.errors.calle ? <Alerta error={formik.errors.calle} /> : null}
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
          placeholder="Ingresa la numeracion del asociado"
          onChange={formik.handleChange}
          value={formik.values.numeracion ?? ""}
        />
        {formik.errors.numeracion ? (
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
          placeholder="Ingresa el barrio del asociado"
          onChange={formik.handleChange}
          value={formik.values.barrio ?? ""}
        />
        {formik.errors.barrio ? <Alerta error={formik.errors.barrio} /> : null}
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
          placeholder="Ingresa el piso del asociado"
          onChange={formik.handleChange}
          value={formik.values.piso ?? ""}
        />

        {formik.errors.piso ? <Alerta error={formik.errors.piso} /> : null}
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
          placeholder="Ingresa el departamento del asociado"
          onChange={formik.handleChange}
          value={formik.values.departamento ?? ""}
        />

        {formik.errors.departamento ? (
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
        {formik.errors.localidad_id ? (
          <Alerta error={formik.errors.localidad_id} />
        ) : null}
        {/* <p className="mt-2 text-slate-600">
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
        /> */}
      </div>
      <input
        type="submit"
        value={editMode ? "Actualizar asociado" : "Crear asociado"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
