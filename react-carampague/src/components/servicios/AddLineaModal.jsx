// src/components/lineas/AddLineaModal.jsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TimePicker } from "../utilities/timePicker/TimePicker";
import { createLineaServicio, updateLineaServicio } from "../../store/thunks/LineasServiciosThunks";
import { useNavigate } from "react-router-dom";
import { selectAllServicios } from "../../store/selectors/ServiciosSelectors";


const LineaSchema = Yup.object().shape({
  fecha: Yup.string().required("La fecha es obligatoria"),
  hora_inicio: Yup.string().required("La hora de inicio es obligatoria"),
  hora_fin: Yup.string().required("La hora de fin es obligatoria"),
  objetivoId: Yup.string().nullable(),
});

export const AddLineaModal = ({
  onClose,
  servicioId = null,
  isPlanDiario = false,
  defaultFecha = "",
  isEditing = false,
  lineaData = null,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const servicios = useSelector(selectAllServicios);
  const { objetivos } = useSelector((state) => state.objetivos);

  // initialValues: Si estamos editando y tenemos datos, los usamos.
  const initialValues =
    isEditing && lineaData
      ? {
          fecha: lineaData.fecha || "",
          hora_inicio: lineaData.hora_inicio || "",
          hora_fin: lineaData.hora_fin || "",
          objetivoId: "",
        }
      : {
          fecha: defaultFecha || "",
          hora_inicio: "",
          hora_fin: "",
          objetivoId: "",
        };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Editar Línea" : "Agregar Línea Manual"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={LineaSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              // a) Determinar el servicio
              let finalServicioId = servicioId;

              // Si PlanDiario => derivamos con objetivoId
              if (isPlanDiario) {
                if (!values.objetivoId) {
                  Swal.fire("Error", "Seleccione un objetivo", "error");
                  setSubmitting(false);
                  return;
                }
                const servicioEncontrado = servicios.find(
                  (s) =>
                    s.objetivo_id && s.objetivo_id.toString() === values.objetivoId
                );
                if (!servicioEncontrado) {
                  Swal.fire(
                    "Error",
                    "No se encontró un servicio para ese objetivo",
                    "error"
                  );
                  setSubmitting(false);
                  return;
                }
                finalServicioId = servicioEncontrado.id;
              } else {
                // b) Modo Cobertura => esperamos que "servicioId" exista, salvo que
                // sea edición y ya venga en lineaData
                if (!finalServicioId && !isEditing) {
                  Swal.fire(
                    "Error",
                    "No se pudo determinar el servicioId",
                    "error"
                  );
                  setSubmitting(false);
                  return;
                }
              }

              // c) Modo edición
              if (isEditing && lineaData) {
                const payload = {
                  id: lineaData.id,
                  fecha: values.fecha,
                  hora_inicio: values.hora_inicio,
                  hora_fin: values.hora_fin,
                };
                await dispatch(updateLineaServicio(lineaData.id, payload, navigate));
              }
              // d) Modo creación
              else {
                const data = {
                  fecha: values.fecha,
                  hora_inicio: values.hora_inicio,
                  hora_fin: values.hora_fin,
                  servicio_id: finalServicioId,
                  is_planificado: !isPlanDiario,
                  is_validado: !isPlanDiario ? true : null,
                };
                await dispatch(createLineaServicio(data));
              }

              onClose();
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form>
              {/* Fecha */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={values.fecha}
                  onChange={(e) => setFieldValue("fecha", e.target.value)}
                  className="border p-2 w-full"
                />
                {errors.fecha && touched.fecha && (
                  <div className="text-red-600 text-sm">{errors.fecha}</div>
                )}
              </div>

              {/* Hora Inicio */}
              <div className="mb-3 flex flex-col">
                <label className="block text-sm font-medium mb-1">
                  Hora Inicio
                </label>
                <TimePicker
                  value={values.hora_inicio}
                  onChange={(nuevaHora) =>
                    setFieldValue("hora_inicio", nuevaHora)
                  }
                  label=""
                />
                {errors.hora_inicio && touched.hora_inicio && (
                  <div className="text-red-600 text-sm">
                    {errors.hora_inicio}
                  </div>
                )}
              </div>

              {/* Hora Fin */}
              <div className="mb-3 flex flex-col">
                <label className="block text-sm font-medium mb-1">
                  Hora Fin
                </label>
                <TimePicker
                  value={values.hora_fin}
                  onChange={(nuevaHora) => setFieldValue("hora_fin", nuevaHora)}
                  label=""
                />
                {errors.hora_fin && touched.hora_fin && (
                  <div className="text-red-600 text-sm">{errors.hora_fin}</div>
                )}
              </div>

              {/* Si PlanDiario => objetivo */}
              {isPlanDiario && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Objetivo
                  </label>
                  <select
                    name="objetivoId"
                    value={values.objetivoId}
                    onChange={(e) =>
                      setFieldValue("objetivoId", e.target.value)
                    }
                    className="border p-2 w-full"
                  >
                    <option value="">Seleccione un objetivo</option>
                    {objetivos.map((obj) => (
                      <option key={obj.id} value={obj.id.toString()}>
                        {obj.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                    ? "Actualizar"
                    : "Guardar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
