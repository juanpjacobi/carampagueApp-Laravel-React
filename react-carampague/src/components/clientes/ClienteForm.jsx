import React, { useEffect, useState } from "react";
import ModalLocalidad from "./ModalLocalidad";
import { getTiposTelefono } from "../../functions/TipoTelefono/tipoTelefono";
import { getCondicionesIva } from "../../functions/CondicionIva/condicionIva";
import { getProvincias } from "../../functions/Provincia/provincia";
import { getLocalidades } from "../../functions/Localidad/localidad";
import { getEstados } from "../../functions/Estado/estado";
import { createCliente } from "../../functions/Cliente/clientes";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


export const ClienteForm = () => {
  const initialState = {
    razon_social: "",
    cuit_cliente: null,
    email: "",
    condicion_iva_id: null,
    numero_telefono: "",
    tipo_telefono_id: null,
    estado_id: null,
    calle: "",
    numeracion: "",
    barrio: "",
    piso: "",
    localidad_id: null,
  };

  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [condicionesIva, setCondicionesIva] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [values, setValues] = useState(initialState);
  const [errores, setErrores] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  

  useEffect(() => {
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
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await createCliente(values);
    if (data.cliente) {
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: true,
      }).then(res => navigate('/clientes'))}
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="mt-2 w-full p-3 bg-gray-200"
          name="email"
          placeholder="Ingresa el email del cliente"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="condicion_iva_id">
          Condicion frente al IVA
        </label>
        <select
          name="condicion_iva_id"
          id="condicion_iva_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={handleChange}
        >
          <option value=""> Seleccione uno</option>
          {condicionesIva?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numero_telefono">
          Numero de telefono
        </label>
        <input
          type="text"
          id="numero_telefono"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numero_telefono"
          placeholder="Ingresa el numero_telefono del cliente"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="tipo_telefono_id">
          Tipo de telefono
        </label>
        <select
          name="tipo_telefono_id"
          id="tipo_telefono_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={handleChange}
        >
          <option value="">Seleccione uno</option>
          {tiposTelefono?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_id">
          Estado del cliente
        </label>
        <select
          name="estado_id"
          id="estado_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={handleChange}
        >
          <option value="">Seleccione uno</option>
          {estados?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="localidad_id">
          Localidad
        </label>
        <select
          name="localidad_id"
          id="localidad_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={handleChange}
        >
          <option value=""> Seleccione uno</option>
          {localidades?.map((l, i) => (
            <option key={i} value={l.id}>
              {l.nombre}
            </option>
          ))}
        </select>
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
          values={values}
          setValues={setValues}
          setLocalidades={setLocalidades}
          loadLocalidades={loadLocalidades}
          localidades={localidades}
          provincias={provincias}
        />
      </div>
      <input
        type="submit"
        value="Crear cliente"
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
