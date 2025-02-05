
export const mapObjetivoRealations = (objetivo,  barrios, localidades, provincias, clientes) => {
    const cliente = clientes.find((cliente) => cliente.id === parseInt(objetivo.cliente_id));
    const barrio = barrios.find((barrio) => barrio.id === objetivo.direccion.barrio_id);
    const localidad = localidades.find((localidad) => localidad.id === objetivo.direccion.localidad_id);
    const provincia = provincias.find((provincia) => provincia.id === objetivo.direccion.provincia_id);
  

    return {
        ...objetivo,
        barrio: barrio || {},
        localidad: localidad || {},
        provincia: provincia || {},
        cliente: cliente || {},


    };
};
