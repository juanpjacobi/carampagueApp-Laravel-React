import * as Yup from "yup";

export const clienteSchema = Yup.object().shape({
  razon_social: Yup.string().required("Requerido"),
  cuit_cliente: Yup.number()
    .typeError("Debe ser un número")
    .required("Requerido")
    .test(
      "len",
      "Debe tener 11 dígitos",
      (val) => val && val.toString().length === 11
    ),
  email: Yup.string().email("Email inválido").required("Requerido"),
  activo: Yup.boolean().required("Requerido"),
  condicion_iva_id: Yup.number().required("Requerido"),
  numero_telefono: Yup.string()
    .required("Requerido")
    .matches(/^\d{7,15}$/, "Debe tener entre 7 y 15 dígitos"),
  tipo_telefono_id: Yup.number().required("Requerido"),
  calle: Yup.string().required("Requerido"),
  numeracion: Yup.number()
    .typeError("Debe ser un número")
    .required("Requerido"),
  barrio_id: Yup.number().required("Requerido"),
  piso: Yup.string().nullable(),
  departamento: Yup.string().nullable(),

});
