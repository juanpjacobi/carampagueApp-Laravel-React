import { useFormik } from "formik";
import { useDispatch, useSelector,  } from "react-redux";
import { useEffect, useState } from "react";
import { valorSchema } from "../../utilities/validator/valor/valorSchema";
import { Alerta } from "../../shared/Alerta";
import { createValor } from "../../../store/thunks/ValoresThunks";

export const ValorForm = ({ selectedCliente, editMode }) => {
  const dispatch = useDispatch();

  const objetivosConRelaciones = useSelector((state) => state.objetivos.objetivos);
  const valoresConRelaciones = useSelector((state) => state.valores.valores);

  const objetivosFiltrados = objetivosConRelaciones.filter(
    (obj) => obj.cliente_id === selectedCliente.id
  );

  const valoresFiltrados = valoresConRelaciones.filter(
    (valor) => valor.cliente_id === selectedCliente.id
  );

  const [isApplyToObjective, setIsApplyToObjective] = useState(false);


  const initialState = {
    valor_vigilador:
      valoresFiltrados.length > 0 && editMode
        ? valoresFiltrados[0].valor_vigilador
        : "",
    valor_cliente:
      valoresFiltrados.length > 0 && editMode
        ? valoresFiltrados[0].valor_cliente
        : "",
    periodo:
      valoresFiltrados.length > 0 && editMode
        ? valoresFiltrados[0].periodo
        : "",
    objetivo_id: "", // Lo manejamos con un checkbox
    cliente_id: selectedCliente.id,
  };


  const formik = useFormik({
    initialValues: initialState,
    validationSchema: valorSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
        if (isApplyToObjective && !values.objetivo_id) {
          formik.setErrors({
            objetivo_id: "El objetivo es requerido si se aplica a un objetivo específico"
          });
          return;
        }
        dispatch(createValor(values));
      },
    });

  useEffect(() => {
    if (!isApplyToObjective) {
      formik.setFieldValue("objetivo_id", ""); 
    }
  }, [isApplyToObjective]); 
  

  const handleApplyToObjectiveChange = () => {
    setIsApplyToObjective(prev => !prev); // Cambiar el estado del checkbox
  };
  

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="text-gray-700 text-sm text-center">
        <span>Los campos marcados con * son obligatorios</span>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_cliente">
          Valor Cliente*
        </label>
        <input
          type="number"
          id="valor_cliente"
          className="mt-2 w-full p-3 bg-gray-200"
          name="valor_cliente"
          placeholder="Ingresa el valor para el cliente"
          onChange={formik.handleChange}
          value={formik.values.valor_cliente ?? ""}
        />
        {formik.errors.valor_cliente ? (
          <Alerta error={formik.errors.valor_cliente} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="valor_vigilador">
          Valor vigilador*
        </label>
        <input
          type="number"
          id="valor_vigilador"
          className="mt-2 w-full p-3 bg-gray-200"
          name="valor_vigilador"
          placeholder="Ingresa el valor para el vigilador"
          onChange={formik.handleChange}
          value={formik.values.valor_vigilador ?? ""}
        />
        {formik.errors.valor_vigilador ? (
          <Alerta error={formik.errors.valor_vigilador} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="periodo">
          Periodo (Mes-Año)*
        </label>
        <input
          type="month"
          id="periodo"
          className="mt-2 w-full p-3 bg-gray-200"
          name="periodo"
          onChange={formik.handleChange}
          value={formik.values.periodo ?? ""}
        />
        {formik.errors.periodo ? (
          <Alerta error={formik.errors.periodo} />
        ) : null}
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          id="applyToObjective"
          name="applyToObjective"
          checked={isApplyToObjective}
          onChange={handleApplyToObjectiveChange}
        />
        <label className="text-slate-800" htmlFor="applyToObjective">
          Aplicar a objetivo específico
        </label>
      </div>

      {isApplyToObjective && objetivosFiltrados.length > 0 && (
        <div className="mb-4">
          <label className="text-slate-800" htmlFor="objetivo_id">
            Seleccione un objetivo
          </label>
          <select
            name="objetivo_id"
            id="objetivo_id"
            className="mt-2 w-full p-3 bg-gray-200"
            onChange={(e) => {
              formik.setFieldValue("objetivo_id", parseInt(e.target.value)); // Actualizar el objetivo_id
            }}
            value={formik.values.objetivo_id || ""} // Si no se aplica a objetivo, no tiene valor
          >
            <option value="">Seleccione un objetivo</option>
            {objetivosFiltrados.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.nombre}
              </option>
            ))}
          </select>
          {formik.errors.objetivo_id ? (
            <Alerta error={formik.errors.objetivo_id} />
          ) : null}
        </div>
      )}

      <input
        type="submit"
        value="Crear valor"
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
