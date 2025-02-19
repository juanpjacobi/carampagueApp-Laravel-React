import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Alerta } from "../shared/Alerta";
import { createUser } from "../../store/thunks/UserThunks";
import { userSchema } from "../utilities/validator/asociado/userSchema";
import { ActivoToggle } from "../shared/estado/ActivoTogle";

export const UserForm = ({ editMode, initialData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.roles.roles);

  const initialState = {
    nombre_usuario: initialData ? initialData.nombre_usuario : "",
    password: "",
    rol_id: initialData ? initialData.rol_id : "",
    activo: initialData ? initialData.activo : false,
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: userSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      if (editMode) {
        // dispatch(updateUser(initialData.id, formik.values, navigate));
      } else {
        dispatch(createUser(formik.values, navigate));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="text-gray-700 text-sm text-center mb-2">
        <span>Los campos marcados con * son obligatorios</span>
      </div>

      {/* Nombre de usuario */}
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="nombre_usuario">
          Nombre de usuario*
        </label>
        <input
          type="text"
          id="nombre_usuario"
          name="nombre_usuario"
          autoComplete="username"
          className="mt-2 w-full p-3 bg-gray-200"
          placeholder="Ingresa el nombre de usuario"
          onChange={formik.handleChange}
          value={formik.values.nombre_usuario || ""}
        />
        {formik.errors.nombre_usuario && (
          <Alerta error={formik.errors.nombre_usuario} />
        )}
      </div>

      {/* Contraseña */}
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="password">
          Contraseña{!editMode && "*"}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          className="mt-2 w-full p-3 bg-gray-200"
          placeholder={
            editMode
              ? "Dejar en blanco para mantener la contraseña"
              : "Ingresa la contraseña"
          }
          onChange={formik.handleChange}
          value={formik.values.password || ""}
        />
        {formik.errors.password && <Alerta error={formik.errors.password} />}
      </div>

      {/* Rol */}
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="rol_id">
          Rol*
        </label>
        <select
          id="rol_id"
          name="rol_id"
          className="mt-2 w-full p-3 bg-gray-200"
          onChange={formik.handleChange}
          value={formik.values.rol_id || ""}
        >
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>
        {formik.errors.rol_id && <Alerta error={formik.errors.rol_id} />}
      </div>

      <div className="mb-4">
      <ActivoToggle formik={formik}/>

      </div>

      <input
        type="submit"
        value={editMode ? "Actualizar usuario" : "Crear usuario"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3
        uppercase font-bold cursor-pointer rounded-md"      />
    </form>
  );
};
