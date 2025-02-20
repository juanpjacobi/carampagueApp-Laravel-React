import * as Yup from "yup";

export const userSchema = (editMode = false) =>
  Yup.object().shape({

    nombre_usuario: Yup.string()
      .required("Requerido")
      .max(255, "El nombre de usuario debe tener como máximo 255 caracteres"),
    password: editMode
      ? Yup.string() // Opcional en edición
      : Yup.string()
          .required("Requerido")
          .min(6, "La contraseña debe tener al menos 6 caracteres"),
    rol_id: Yup.string().required("Requerido"),
    activo: Yup.boolean().required("Requerido"),
  });
