import * as Yup from 'yup';

export const clienteSchema = Yup.object().shape({
    razon_social: Yup.string().required('Requerido'),
    cuit_cliente: Yup.number('Debe ser un numero').required('Requerido'),
    email: Yup.string().email('Email invalido').required('Requerido'),
    condicion_iva_id: Yup.number().required('Requerido'),
    numero_telefono: Yup.number().typeError('Debe ser un numero').required('Requerido'),
    tipo_telefono_id: Yup.number().required('Requerido'),
    estado_id: Yup.number().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeracion: Yup.number('Debe ser un numero').required('Requerido'),
    barrio: Yup.string().required('Requerido'),
    piso: Yup.string().required('Requerido'),
    departamento: Yup.string().required('Requerido'),
    localidad_id: Yup.number().required('Requerido'),
   })