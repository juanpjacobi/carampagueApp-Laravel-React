import * as Yup from 'yup';

export const documentacionAsociadoSchema = Yup.object().shape({

    fecha_solicitud: Yup.date().required('Requerido'),
    observaciones: Yup.string().required('Requerido'),
    tipo_documentacion_id: Yup.number().required('Requerido'),
    estado_documentacion_id: Yup.number().required('Requerido'),
    documentacion_id: Yup.number().required('Requerido'),
   })