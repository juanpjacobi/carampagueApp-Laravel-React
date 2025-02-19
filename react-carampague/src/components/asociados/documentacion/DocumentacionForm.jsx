import { useDispatch, useSelector } from "react-redux";
import { documentacionAsociadoSchema } from "../../utilities/validator/asociado/documentacionAsociadoSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { Alerta } from "../../shared/Alerta";
import { useEffect, useMemo } from "react";
import { makeSelectLineaDocumentacionById } from "../../../store/selectors/LineasDocumentacionSelectors";
import { makeSelectDocumentacionByAsociadoId } from "../../../store/selectors/DocumentacionSelectors";
import { createLineaDocumentacion, updateLineaDocumentacion } from "../../../store/thunks/LineasDocumentacionThunks";

export const DocumentacionForm = ({ editMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { lineaId, asociadoId } = params;
  const {  tiposDocumentacion } = useSelector((state) => state.tiposDocumentacion);
  const {  estadosDocumentacion } = useSelector((state) => state.estadosDocumentacion);

  const linea = editMode
  ? useSelector(makeSelectLineaDocumentacionById(lineaId))
  : null;

  const documentacion = useSelector(makeSelectDocumentacionByAsociadoId(asociadoId));



  useEffect(() => {
    if (editMode && !linea) {
      navigate("/asociados", { replace: true });
    }
    if (!editMode && !documentacion) {
      navigate("/asociados", { replace: true });
    }
  }, [editMode, linea, documentacion, navigate]);



  const initialstate = useMemo(() => {
    if (editMode && linea) {
      return {
        fecha_solicitud: linea.fecha_solicitud || "",
        fecha_entrega: linea.fecha_entrega || "",
        fecha_vencimiento: linea.fecha_vencimiento || "",
        observaciones: linea.observaciones || "",
        tipo_documentacion_id: linea.tipo_documentacion_id ? String(linea.tipo_documentacion_id) : "",
        estado_documentacion_id: linea.estado_documentacion_id ? String(linea.estado_documentacion_id) : "",
        documentacion_id: linea.documentacion_id || "", // Se supone que la línea tiene este campo
      };
    } else if (!editMode && documentacion) {
      return {
        fecha_solicitud: "",
        fecha_entrega: "",
        fecha_vencimiento: "",
        observaciones: "",
        tipo_documentacion_id: "",
        estado_documentacion_id: "",
        documentacion_id: documentacion.id, 
      };
    } else {
      // Valores por defecto
      return {
        fecha_solicitud: "",
        fecha_entrega: "",
        fecha_vencimiento: "",
        observaciones: "",
        tipo_documentacion_id: "",
        estado_documentacion_id: "",
        documentacion_id: "",
      };
    }
  }, [editMode, linea, documentacion]);


  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateLineaDocumentacion(
        linea.id,
        formik.values,
        navigate,
      ));
    } else {
      dispatch(createLineaDocumentacion(
        formik.values,
        navigate,
        documentacion.id
      ));
    }
  };

  const formik = useFormik({
    
    initialValues: initialstate,
    validationSchema: documentacionAsociadoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="text-gray-700 text-sm text-center mb-2">
        <span>Los campos marcados con * son obligatorios</span>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="fecha_solicitud">
          Fecha de solicitud*
        </label>
        <input
          type="date"
          id="fecha_solicitud"
          className="mt-2 w-full p-3 bg-gray-200"
          name="fecha_solicitud"
          onChange={formik.handleChange}
          value={formik.values.fecha_solicitud ?? ""}
        />
        {formik.errors.fecha_solicitud ? (
          <Alerta error={formik.errors.fecha_solicitud} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="observaciones">
          Observaciones*
        </label>

        <input
          type="text"
          id="observaciones"
          className="mt-2 w-full p-3 bg-gray-200"
          name="observaciones"
          placeholder="Puedes agregar observaciones aquí"
          onChange={formik.handleChange}
          value={formik.values.observaciones ?? ""}
        />
        {formik.errors.observaciones ? (
          <Alerta error={formik.errors.observaciones} />
        ) : null}
      </div>

      <div className="mb-4">
        <label className="text-slate-800" htmlFor="tipo_documentacion_id">
          Tipo de documentacion*
        </label>
        <select
          name="tipo_documentacion_id"
          id="tipo_documentacion_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.tipo_documentacion_id ?? ""}
        >
          <option value="">Seleccione uno</option>
          {tiposDocumentacion?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre_tipo_documentacion}
            </option>
          ))}
        </select>
        {formik.errors.tipo_documentacion_id ? (
          <Alerta error={formik.errors.tipo_documentacion_id} />
        ) : null}
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="estado_documentacion_id">
          Estado de la documentacion*
        </label>
        <select
          name="estado_documentacion_id"
          id="estado_documentacion_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.estado_documentacion_id ?? ""}
        >
          <option value="">Seleccione uno</option>
          {estadosDocumentacion?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre_estado_documentacion}
            </option>
          ))}
        </select>
        {formik.errors.estado_documentacion_id ? (
          <Alerta error={formik.errors.estado_documentacion_id} />
        ) : null}
      </div>
      {editMode && (
        <>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="fecha_entrega">
              Fecha de entrega
            </label>
            <input
              type="date"
              id="fecha_entrega"
              className="mt-2 w-full p-3 bg-gray-200"
              name="fecha_entrega"
              onChange={formik.handleChange}
              value={formik.values.fecha_entrega ?? ""}
            />
            {formik.errors.fecha_entrega ? (
              <Alerta error={formik.errors.fecha_entrega} />
            ) : null}
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="fecha_vencimiento">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              id="fecha_vencimiento"
              className="mt-2 w-full p-3 bg-gray-200"
              name="fecha_vencimiento"
              onChange={formik.handleChange}
              value={formik.values.fecha_vencimiento ?? ""}
            />
            {formik.errors.fecha_vencimiento ? (
              <Alerta error={formik.errors.fecha_vencimiento} />
            ) : null}
          </div>
        </>
      )}

      <input
        type="submit"
        value={editMode ? "Editar documentación" : "Registrar documentación"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
          uppercase font-bold cursor-pointer rounded-md"
      />
    </form>
  );
};