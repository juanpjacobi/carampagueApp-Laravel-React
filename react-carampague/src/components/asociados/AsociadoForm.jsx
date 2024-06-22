import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getTiposTelefono } from "../../functions/TipoTelefono/tipoTelefono";
import { getEstadosCiviles } from "../../functions/EstadoCivl/estadoCivil";
import { Alerta } from "../shared/Alerta";
import {
  createAsociado,
  updateAsociado,
} from "../../store/thunks/AsociadosThunks";
import { asociadoSchema } from "../utilities/validator/asociado/asociadoSchema";
import DireccionForm from "../shared/direcciones/DireccionForm";
import { ActivoToggle } from "../shared/estado/ActivoTogle";

export const AsociadoForm = ({ editMode }) => {

  const { selectedAsociado } = useSelector((state) => state.asociados);
  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedAsociado && editMode) {
      navigate("/asociados");
    }
    loadTiposTelefonos();
    loadEstadosCiviles();
  }, []);

  const loadTiposTelefonos = async () => {
    const { data } = await getTiposTelefono();
    setTiposTelefono(data.tipos_telefonos);
  };

  const loadEstadosCiviles = async () => {
    const { data } = await getEstadosCiviles();
    setEstadosCiviles(data.estados_civiles);
  };

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
    activo: selectedAsociado ? selectedAsociado.activo : null,
    calle: selectedAsociado ? selectedAsociado.direccion.calle : "",
    numeracion: selectedAsociado ? selectedAsociado.direccion.numeracion : "",
    piso: selectedAsociado ? selectedAsociado.direccion.piso : "",
    provincia_id: selectedAsociado
      ? selectedAsociado.direccion.barrio.localidad.provincia_id.toString()
      : null,
    localidad_id: selectedAsociado
      ? selectedAsociado.direccion.barrio.localidad_id.toString()
      : null,
    barrio_id: selectedAsociado ? selectedAsociado.direccion.barrio_id.toString() : "",
    departamento: selectedAsociado
      ? selectedAsociado.direccion.departamento
      : "",
  };



  const handleSubmit = () => {
    if (editMode) {
      console.log(selectedAsociado.id);
      dispatch(updateAsociado(selectedAsociado.id, formik.values, navigate));
      return;
    }
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
      <div className="text-gray-700 text-sm text-center">
        <span>Los campos marcados con * son obligatorios</span>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="nombre_asociado">
          Nombre*
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
          Apellido*
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
          Numero de asociado*
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
          Cuit*
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
          Fecha de alta*
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
        {formik.errors.fecha_nacimiento ? (
          <Alerta error={formik.errors.fecha_nacimiento} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="fecha_alta">
          Fecha de nacimiento*
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
        {formik.errors.fecha_alta ? (
          <Alerta error={formik.errors.fecha_alta} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_civil_id">
          Estado civil*
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
          Numero de telefono*
        </label>
        <input
          type="text"
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
      <ActivoToggle formik={formik}/>
      <DireccionForm formik={formik} />
      <input
        type="submit"
        value={editMode ? "Actualizar asociado" : "Crear asociado"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
