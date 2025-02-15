import { useDispatch, useSelector } from "react-redux";
import { createAjuste, updateAjuste } from "../../store/thunks/AjustesThunks";
import { selectAllTiposAjustes } from "../../store/selectors/TiposAjustesSelectors";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alerta } from "../../components/shared/Alerta";

export const AjusteFormModal = ({ isOpen, onClose, initialData = {} }) => {
  const dispatch = useDispatch();
  const tiposAjustesState = useSelector(selectAllTiposAjustes);
  const tiposArray = tiposAjustesState.allIds.map(
    (id) => tiposAjustesState.tiposAjustes[id]
  );

  // Obtenemos la lista de asociados para buscar el detalle del asociado
  const { asociados } = useSelector((state) => state.asociados);

  // Modo edición si existe initialData.id
  const isEditing = Boolean(initialData.id);

  // Esquema de validación con Yup
  const ajusteSchema = Yup.object().shape({
    tipoAjusteId: Yup.string().required("El tipo de ajuste es requerido"),
    monto: Yup.number()
      .typeError("El monto debe ser un número")
      .required("El monto es requerido"),
    periodoInicio: Yup.string().required("El periodo de inicio es requerido"),
    duracionMeses: Yup.number()
      .typeError("La duración debe ser un número")
      .min(1, "La duración debe ser al menos 1 mes")
      .required("La duración es requerida"),
    asociado_id: Yup.string(),
  });

  // Calculamos el asociado_id inicial usando asociado o asociado_id
  const initialAsociadoId = initialData.asociado
    ? initialData.asociado.id
    : initialData.asociado_id || "";

  const formik = useFormik({
    initialValues: {
      tipoAjusteId: initialData.tipoAjusteId || "",
      monto: initialData.monto || "",
      periodoInicio: initialData.periodoInicio || "",
      duracionMeses: initialData.duracionMeses || 1,
      asociado_id: initialAsociadoId,
    },
    enableReinitialize: true,
    validationSchema: ajusteSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        tipo_ajuste_id: values.tipoAjusteId,
        monto: values.monto,
        periodo_inicio: values.periodoInicio,
        duracion_meses: values.duracionMeses,
        asociado_id: values.asociado_id ? values.asociado_id : null,
        global: !values.asociado_id,
      };

      try {
        if (isEditing) {
          await dispatch(updateAjuste(initialData.id, data));
          Swal.fire({
            icon: "success",
            title: "Ajuste actualizado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await dispatch(createAjuste(data));
          Swal.fire({
            icon: "success",
            title: "Ajuste creado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Manejador para el cambio en el select de Tipo de Ajuste.
  const handleTipoAjusteChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("tipoAjusteId", value);
    if (!formik.values.monto) {
      const tipo = tiposArray.find((t) => String(t.id) === value);
      if (tipo) {
        formik.setFieldValue("monto", tipo.monto);
      }
    }
  };

  // Buscar el objeto asociado según el ID en Formik
  const asociadoObj = formik.values.asociado_id
    ? asociados.find(
        (a) => String(a.id) === String(formik.values.asociado_id)
      )
    : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Editar Ajuste" : "Crear Ajuste"}
        </h2>
        <div className="text-gray-700 text-sm text-center mb-2">
          <span>Los campos marcados con * son obligatorios</span>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
          {/* Tipo de Ajuste */}
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="tipoAjusteId"
            >
              Tipo de Ajuste *
            </label>
            <select
              id="tipoAjusteId"
              name="tipoAjusteId"
              value={formik.values.tipoAjusteId}
              onChange={handleTipoAjusteChange}
              className="w-full border rounded p-2 bg-gray-200"
            >
              <option value="">Seleccione un tipo</option>
              {tiposArray.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.concepto} {tipo.add ? "(Suma)" : "(Resta)"}
                </option>
              ))}
            </select>
            {formik.errors.tipoAjusteId && (
              <Alerta error={formik.errors.tipoAjusteId} />
            )}
          </div>

          {/* Monto */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="monto">
              Monto *
            </label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formik.values.monto}
              onChange={formik.handleChange}
              className="w-full border rounded p-2 bg-gray-200"
            />
            {formik.errors.monto && <Alerta error={formik.errors.monto} />}
          </div>

          {/* Periodo de Inicio */}
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="periodoInicio"
            >
              Periodo de Inicio (YYYY-MM) *
            </label>
            <input
              type="month"
              id="periodoInicio"
              name="periodoInicio"
              value={formik.values.periodoInicio}
              onChange={formik.handleChange}
              className="w-full border rounded p-2 bg-gray-200"
            />
            {formik.errors.periodoInicio && (
              <Alerta error={formik.errors.periodoInicio} />
            )}
          </div>

          {/* Duración en Meses */}
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="duracionMeses"
            >
              Duración (meses) *
            </label>
            <input
              type="number"
              id="duracionMeses"
              name="duracionMeses"
              value={formik.values.duracionMeses}
              onChange={formik.handleChange}
              className="w-full border rounded p-2 bg-gray-200"
              min="1"
            />
            {formik.errors.duracionMeses && (
              <Alerta error={formik.errors.duracionMeses} />
            )}
          </div>

          {/* Mostrar la asignación */}
          <div>
            <label className="block font-semibold mb-1">Asignación</label>
            {formik.values.asociado_id ? (
              <span className="text-green-600 font-bold">
                {asociadoObj
                  ? `${asociadoObj.nombre} ${asociadoObj.apellido}`
                  : "Individual"}
              </span>
            ) : (
              <span className="text-blue-600 font-bold">Global</span>
            )}
            {formik.errors.asociado_id && (
              <Alerta error={formik.errors.asociado_id} />
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
