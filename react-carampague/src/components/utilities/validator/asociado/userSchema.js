import * as Yup from "yup";

export const userSchema = (editMode = false) =>
  Yup.object().shape({

    nombre_usuario: Yup.string()
      .required("El nombre de usuario es obligatorio")
      .max(255, "El nombre de usuario debe tener como máximo 255 caracteres"),
    password: editMode
      ? Yup.string() // Opcional en edición
      : Yup.string()
          .required("La contraseña es obligatoria")
          .min(6, "La contraseña debe tener al menos 6 caracteres"),
    rol_id: Yup.string().required("El rol es obligatorio"),
    activo: Yup.boolean().required("El estado es obligatorio"),
  });
