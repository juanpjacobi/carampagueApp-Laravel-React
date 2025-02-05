import * as Yup from "yup";

export const valorSchema = Yup.object().shape({
  valor_vigilador: Yup.number()
    .required("Requerido")
    .min(0, "Debe ser un número positivo"),

  valor_cliente: Yup.number()
    .required("Requerido")
    .min(0, "Debe ser un número positivo")
    .test(
      "greater-than-vigilador", 
      "El valor del cliente debe ser mayor que el valor del vigilador",
      function(value) {
        const { valor_vigilador } = this.parent;
        return value > valor_vigilador; 
      }
    ),

  periodo: Yup.string()
    .required("Requerido")
    .matches(
      /^(20[0-9]{2})-(0[1-9]|1[0-2])$/,
      "Debe ser un periodo válido (Formato: YYYY-MM)"
    ),

  cliente_id: Yup.number()
    .required("El cliente es requerido"),

  objetivo_id: Yup.number()
    .nullable() // No hacer obligatorio aquí
});
