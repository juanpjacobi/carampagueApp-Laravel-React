import * as Yup from 'yup';

export const asociadoSchema = Yup.object().shape({
    nombre_asociado: Yup.string().required('Requerido'),
    apellido_asociado: Yup.string().required('Requerido'),
    numero_asociado: Yup.number('Debe ser un numero').required('Requerido'),
    cuit_asociado: Yup.number('Debe ser un numero').required('Requerido'),
    fecha_alta: Yup.date().required('Requerido'),
    fecha_nacimiento: Yup.date().required('Requerido'),
    estado_civil_id: Yup.number().required('Requerido'),
    activo: Yup.boolean().required('Requerido'),
    numero_telefono: Yup.number().typeError('Debe ser un numero').required('Requerido'),
    tipo_telefono_id: Yup.number().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeracion: Yup.number('Debe ser un numero').required('Requerido'),
    piso: Yup.string().required('Requerido'),
    departamento: Yup.string().required('Requerido'),
    barrio_id: Yup.number().required('Requerido'),
   })