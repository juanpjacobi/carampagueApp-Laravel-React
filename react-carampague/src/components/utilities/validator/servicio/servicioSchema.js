import * as Yup from "yup";

export const servicioSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres"),

  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .max(255, "La descripción no puede tener más de 255 caracteres"),

  objetivo_id: Yup.number()
    .required("El objetivo es obligatorio")
    .integer("El objetivo debe ser un número entero")
    .positive("El objetivo debe ser un número positivo"),

  modalidades: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().optional(), // El ID es opcional para crear nuevas modalidades
        dia_semana: Yup.number()
          .oneOf([0, 1, 2, 3, 4, 5, 6, 7], "Día inválido")
          .required("El día es obligatorio"),

        hora_inicio: Yup.string()
          .required("La hora de inicio es obligatoria")
          .matches(
            /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
            "La hora de inicio debe tener el formato HH:MM"
          ),

        hora_fin: Yup.string()
          .required("La hora de fin es obligatoria")
          .matches(
            /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
            "La hora de fin debe tener el formato HH:MM"
          ),
      })
    )
    .min(1, "Debe haber al menos una modalidad")
    .required("Las modalidades son obligatorias"),
});
