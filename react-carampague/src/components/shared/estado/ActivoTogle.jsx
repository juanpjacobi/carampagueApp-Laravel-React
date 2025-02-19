import { Alerta } from "../Alerta";

export const ActivoToggle = ({ formik }) => {
  return (
    <div className="mb-4">
      <label className="text-slate-800" htmlFor="activo">
        Estado*
      </label>
      <select
        name="activo"
        id="activo"
        className="mt-2 w-full p-3 bg-gray-200"
        onChange={(e) =>
          formik.setFieldValue("activo", Number(e.target.value))
        }
        value={formik.values.activo !== undefined ? formik.values.activo : ""}
      >
        <option value="">Seleccione uno</option>
        <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
      </select>
      {formik.errors.activo && <Alerta error={formik.errors.activo} />}
    </div>
  );
};
