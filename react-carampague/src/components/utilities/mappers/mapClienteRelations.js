
export const mapClienteRelations = (cliente, barrios, localidades, provincias, tiposTelefonos, condicionesIva) => {
    const barrio = barrios.find((barrio) => barrio.id === cliente.direccion.barrio_id);
    const localidad = localidades.find((localidad) => localidad.id === cliente.direccion.localidad_id);
    const provincia = provincias.find((provincia) => provincia.id === cliente.direccion.provincia_id);
    const condicionIva = condicionesIva.find((c) => c.id === cliente.condicion_iva_id);
    const tipoTelefono = tiposTelefonos.find((tipo) => tipo.id === parseInt(cliente.telefono.tipo_telefono_id));

    return {
        ...cliente,
        barrio: barrio || {},
        localidad: localidad || {},
        provincia: provincia || {},
        tipo_telefono: tipoTelefono || {},
        condicionIva: condicionIva || {}
    };
};
