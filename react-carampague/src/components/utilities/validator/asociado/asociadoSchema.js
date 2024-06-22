import * as Yup from 'yup';

export const asociadoSchema = Yup.object().shape({
    nombre_asociado: Yup.string().required('Requerido'),
    apellido_asociado: Yup.string().required('Requerido'),
    numero_asociado: Yup.number().typeError('Debe ser un número').required('Requerido'),
    cuit_asociado: Yup.number().typeError('Debe ser un número').required('Requerido').test(
        'len',
        'Debe tener 11 dígitos',
        val => val && val.toString().length === 11
    ),
    fecha_alta: Yup.date().required('Requerido'),
    fecha_nacimiento: Yup.date().required('Requerido'),
    estado_civil_id: Yup.number().required('Requerido'),
    activo: Yup.boolean().required('Requerido'),
    numero_telefono: Yup.string().required('Requerido').matches(/^\d{7,15}$/, 'Debe tener entre 7 y 15 dígitos'),
    tipo_telefono_id: Yup.number().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeracion: Yup.number().typeError('Debe ser un número').required('Requerido'),
    piso: Yup.string().nullable(),
    departamento: Yup.string().nullable(),
    barrio_id: Yup.number().required('Requerido'),
});
