import React, { useEffect, useState } from "react";
import { getProvincias } from "../../functions/Provincia/provincia";
import { getLocalidades } from "../../functions/Localidad/localidad";
import { getEstados } from "../../functions/Estado/estado";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alerta } from "../Alerta";
import { objetivoSchema } from "../utilities/validator/objetivo/objetivoSchema";
import {createObjetivo, updateObjetivo} from "../../store/thunks/ObjetivosThunks"

export const ObjetivoForm = ({editMode}) => {
  const {selectedObjetivo} = useSelector((state) => state.objetivos)
  const initialState = {
    nombre_objetivo: selectedObjetivo ? selectedObjetivo.nombre : "",
    valor_cliente: selectedObjetivo ? selectedObjetivo.valor.valor_cliente : null,
    valor_vigilador: selectedObjetivo ? selectedObjetivo.valor.valor_vigilador : null,
    cliente_id: selectedObjetivo ? selectedObjetivo.cliente.id : null,
    estado_id: selectedObjetivo ? selectedObjetivo.estado.id : null,
    calle: selectedObjetivo ? selectedObjetivo.direccion.calle : "",
    numeracion: selectedObjetivo ? selectedObjetivo.direccion.numeracion : "",
    barrio:selectedObjetivo ? selectedObjetivo.direccion.barrio : "",
    piso: selectedObjetivo ? selectedObjetivo.direccion.piso :"",
    departamento:selectedObjetivo ? selectedObjetivo.direccion.departamento : "",
    localidad_id: selectedObjetivo ? selectedObjetivo.direccion.localidad_id : null,
  };
  const {clientes} = useSelector((state) => state.clientes);


  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [estados, setEstados] = useState([]);
const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedObjetivo && editMode) {
      navigate('/objetivos');
    }
    loadProvincias();
    loadLocalidades();
    loadEstados();
  }, []);



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
      console.log(formik.values)
      dispatch(updateObjetivo(selectedObjetivo.id, formik.values, navigate))
      return;
    }
    console.log(formik.values)
    dispatch(createObjetivo(formik.values, navigate));
    
  };

  const formik = useFormik({
    initialValues: initialState ,
    validationSchema: objetivoSchema,
    validateOnChange:false,
     validateOnBlur:false,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="nombre_objetivo">
          Nombre del objetivo
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
        { formik.errors.nombre_objetivo ? (
          <Alerta error={formik.errors.nombre_objetivo} />
        ) : null}
      </div>
  
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_id">
          Estado del objetivo
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
        <label className="text-slate-800" htmlFor="cliente_id">
          Cliente
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
        { formik.errors.cliente_id ? (
          <Alerta error={formik.errors.cliente_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_cliente">
          Valor de la hora para el cliente
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
        { formik.errors.valor_cliente ? (
          <Alerta error={formik.errors.valor_cliente} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_vigilador">
          Valor de la hora para el vigilador
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
        { formik.errors.valor_vigilador ? (
          <Alerta error={formik.errors.valor_vigilador} />
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
          placeholder="Ingresa la calle del objetivo"
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
          placeholder="Ingresa la numeracion del objetivo"
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
          placeholder="Ingresa el barrio del objetivo"
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
          placeholder="Ingresa el piso del objetivo"
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
          placeholder="Ingresa el departamento"
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
      </div>
      <input
        type="submit"
        value={editMode ? "Actualizar objetivo" : "Crear objetivo"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
