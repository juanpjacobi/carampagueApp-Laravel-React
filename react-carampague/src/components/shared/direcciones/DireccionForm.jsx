import { useEffect, useState } from "react";
import Select from "react-select";
import { Alerta } from "../Alerta";
import { useSelector } from "react-redux";


const DireccionForm = ({ formik }) => {
  const {barrios, localidades, provincias} = useSelector((state) => state.ubicaciones)
  const [barriosMapped, setBarriosMapped] = useState([]);
  const [localidadesMapped, setLocalidadesMapped] = useState([]);
  const [provinciasMapped, setProvinciasMapped] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {


    const barriosOptions = barrios.map((barrio) => ({
      value: barrio.id,
      label: barrio.nombre_barrio,
      localidad_id: barrio.localidad_id, 
    }));
    const localidadesOptions = localidades.map(
      (localidad) => ({
        value: localidad.id,
        label: localidad.nombre,
        provincia_id: localidad.provincia_id, 
      })
    );
    const provinciasOptions = provincias.map(
      (provincia) => ({
        value: provincia.id,
        label: provincia.nombre,
      })
    );
    setBarriosMapped(barriosOptions);
    setLocalidadesMapped(localidadesOptions);
    setProvinciasMapped(provinciasOptions);
  };

  const handleProvinciaChange = (selectedOption) => {
    formik.setFieldValue(
      "provincia_id",
      selectedOption ? selectedOption.value : ""
    );
    formik.setFieldValue("localidad_id", "");
    formik.setFieldValue("barrio_id", "");
  };

  const handleLocalidadChange = (selectedOption) => {
    formik.setFieldValue(
      "localidad_id",
      selectedOption ? selectedOption.value : ""
    );
    formik.setFieldValue("barrio_id", "");
  };

  const handleBarrioChange = (selectedOption) => {
    formik.setFieldValue(
      "barrio_id",
      selectedOption ? selectedOption.value : ""
    );
  };

  const filteredLocalidades = localidadesMapped.filter(
    (l) => l.provincia_id === formik.values.provincia_id
  );
  const filteredBarrios = barriosMapped.filter(
    (b) => b.localidad_id === formik.values.localidad_id
  );
  return (
    <div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="calle">
          Calle*
        </label>
        <input
          type="text"
          id="calle"
          className="mt-2 w-full p-3 bg-gray-200"
          name="calle"
          placeholder="Ingresa la calle"
          onChange={formik.handleChange}
          value={formik.values.calle ?? ""}
        />
        {formik.errors.calle && <Alerta error={formik.errors.calle} />}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="numeracion">
          Numeración*
        </label>
        <input
          type="number"
          id="numeracion"
          className="mt-2 w-full p-3 bg-gray-200"
          name="numeracion"
          placeholder="Ingresa la numeración"
          onChange={formik.handleChange}
          value={formik.values.numeracion ?? ""}
        />
        {formik.errors.numeracion && (
          <Alerta error={formik.errors.numeracion} />
        )}
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
          placeholder="Ingresa el piso"
          onChange={formik.handleChange}
          value={formik.values.piso ?? ""}
        />
        {formik.errors.piso && <Alerta error={formik.errors.piso} />}
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
        {formik.errors.departamento && (
          <Alerta error={formik.errors.departamento} />
        )}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="provincia_id">
          Provincia*
        </label>
        <Select
          id="provincia_id"
          options={provinciasMapped}
          onChange={handleProvinciaChange}
          value={
            provinciasMapped.find(
              (option) => option.value === formik.values.provincia_id
            ) || null
          }
          placeholder="Selecciona una provincia..."
          isClearable
          className="mt-2 w-full p-3 bg-gray-200"
        />
        {formik.errors.provincia_id && (
          <Alerta error={formik.errors.provincia_id} />
        )}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="localidad_id">
          Localidad*
        </label>
        <Select
          id="localidad_id"
          options={filteredLocalidades}
          onChange={handleLocalidadChange}
          value={
            filteredLocalidades.find(
              (option) => option.value === formik.values.localidad_id
            ) || null
          }
          placeholder="Selecciona una localidad..."
          isClearable
          isDisabled={!formik.values.provincia_id}
          className="mt-2 w-full p-3 bg-gray-200"
        />
        {formik.errors.localidad_id && (
          <Alerta error={formik.errors.localidad_id} />
        )}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="barrio_id">
          Barrio*
        </label>
        <Select
          id="barrio_id"
          options={filteredBarrios}
          onChange={handleBarrioChange}
          value={
            filteredBarrios.find(
              (option) => option.value === formik.values.barrio_id
            ) || null
          }
          placeholder="Selecciona un barrio..."
          isClearable
          isDisabled={!formik.values.localidad_id}
          className="mt-2 w-full p-3 bg-gray-200"
        />
        {formik.errors.barrio_id && <Alerta error={formik.errors.barrio_id} />}
      </div>
    </div>
  );
};

export default DireccionForm;