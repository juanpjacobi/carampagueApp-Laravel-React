import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { Alerta } from "../shared/Alerta";
import { TimePicker } from "../utilities/timePicker/TimePicker";
import { servicioSchema } from "../utilities/validator/servicio/servicioSchema";
import { createServicio, updateServicio } from "../../store/thunks/ServiciosThunks";

export const ServicioForm = ({ editMode, initialData }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { objetivos } = useSelector((state) => state.objetivos);


  const initialState = {
    nombre: initialData ? initialData.nombre : "",
    descripcion: initialData ? initialData.descripcion : "",
    objetivo_id: initialData ? initialData.objetivo.id : null,
    modalidades: initialData
      ? initialData.modalidades.map((mod) => ({
          id: mod.id ?? null,
          dia_semana: mod.dia_semana ?? "",
          hora_inicio: mod.hora_inicio ?? "",
          hora_fin: mod.hora_fin ?? "",
        }))
      : [
          {
            dia_semana: "",
            hora_inicio: "",
            hora_fin: "",
            es_feriado: false,
          },
        ],
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateServicio(initialData.id, formik.values, navigate));
    } else {
      dispatch(createServicio(formik.values, navigate));
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: servicioSchema,
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
        <label className="text-slate-800" htmlFor="nombre">
          Nombre del servicio*
        </label>

        <input
          type="text"
          id="nombre"
          className="mt-2 w-full p-3 bg-gray-200"
          name="nombre"
          placeholder="Ingresa el nombre del servicio"
          onChange={formik.handleChange}
          value={formik.values.nombre ?? ""}
        />
        {formik.errors.nombre ? <Alerta error={formik.errors.nombre} /> : null}
      </div>

      <div className="mb-4">
        <label className="text-slate-800" htmlFor="descripcion">
          Descripción del servicio*
        </label>

        <textarea
          id="descripcion"
          className="mt-2 w-full p-3 bg-gray-200"
          name="descripcion"
          placeholder="Ingresa la descripción del servicio"
          onChange={formik.handleChange}
          value={formik.values.descripcion ?? ""}
        />
        {formik.errors.descripcion ? (
          <Alerta error={formik.errors.descripcion} />
        ) : null}
      </div>

      <div className="mb-4">
        <label className="text-slate-800" htmlFor="objetivo_id">
          Objetivo*
        </label>
        <select
          name="objetivo_id"
          id="objetivo_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.objetivo_id ?? ""}
          disabled={editMode} 

        >
          <option value="">Seleccione uno</option>
          {objetivos?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        {formik.errors.objetivo_id ? (
          <Alerta error={formik.errors.objetivo_id} />
        ) : null}
      </div>

      <div className="mb-4">
        <label className="text-slate-800" htmlFor="modalidades">
          Modalidades*
        </label>

        {formik.values.modalidades.map((mod, index) => (
          <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
            <div className="mb-2">
              <label
                className="text-slate-800"
                htmlFor={`modalidades.${index}.dia_semana`}
              >
                Día de la semana*
              </label>
              <select
                name={`modalidades.${index}.dia_semana`}
                value={formik.values.modalidades[index].dia_semana}
                onChange={(e) => {
                  const diaSeleccionado = e.target.value;
                  // Si selecciona feriado, limpiar otras opciones de días
                  if (diaSeleccionado === "7") {
                    formik.setFieldValue(
                      `modalidades.${index}.dia_semana`,
                      "7"
                    );
                  } else {
                    formik.setFieldValue(
                      `modalidades.${index}.dia_semana`,
                      diaSeleccionado
                    );
                  }
                }}
                className="mt-2 w-full p-3 bg-gray-200"
              >
                <option value="">Seleccione un día</option>
                <option value="0">Domingo</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>
                <option value="7">Feriado</option> 
              </select>
            </div>

            <div className="mb-2">
              <label
                className="text-slate-800"
                htmlFor={`modalidades.${index}.hora_inicio`}
              >
                Hora de inicio*
              </label>
              <TimePicker
                value={formik.values.modalidades[index].hora_inicio}
                onChange={(nuevaHora) =>
                  formik.setFieldValue(
                    `modalidades.${index}.hora_inicio`,
                    nuevaHora
                  )
                }
              />
            </div>

            <div className="mb-2">
              <label
                className="text-slate-800"
                htmlFor={`modalidades.${index}.hora_fin`}
              >
                Hora de fin*
              </label>
              <TimePicker
                value={formik.values.modalidades[index].hora_fin}
                onChange={(nuevaHora) =>
                  formik.setFieldValue(
                    `modalidades.${index}.hora_fin`,
                    nuevaHora
                  )
                }
              />
            </div>

      
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "modalidades",
                  formik.values.modalidades.filter((_, i) => i !== index)
                )
              }
              className="text-red-500 mt-2"
            >
              Eliminar Modalidad
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("modalidades", [
              ...formik.values.modalidades,
              {
                dia_semana: "",
                hora_inicio: "",
                hora_fin: "",
                es_feriado: false,
              },
            ])
          }
          className="bg-green-600 text-white text-sm font-semibold px-3 py-2.5 rounded hover:bg-green-700 mt-3"
        >
          Agregar Modalidad
        </button>
      </div>

      <input
        type="submit"
        value={editMode ? "Actualizar servicio" : "Crear servicio"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      />
    </form>
  );
};
