import * as Yup from "yup";

export const entregaRopaAsociadoSchema = Yup.object().shape({
  descripcion: Yup.string().required("Descripción es requerida"),
  asociado_id: Yup.number().required("Asociado es requerido"),
  lineas: Yup.array().of(
    Yup.object().shape({
      prenda_id: Yup.number().required("Prenda es requerida"),
      cantidad: Yup.number().min(1, "Cantidad debe ser mayor a 0").required("Cantidad es requerida"),
    })
  ).min(1, "Debes agregar al menos una línea"),
});
