

export const mapAsociadoRelations = (
    asociado,
    barrios,
    localidades,
    provincias,
    tiposTelefonos,
    estadosCiviles,
    entregasRopaById,
    documentacionesArray
  ) => {
    const barrio = barrios.find(
      (barrio) => barrio.id === asociado.direccion.barrio_id
    );
    const localidad = localidades.find(
      (localidad) => localidad.id === asociado.direccion.localidad_id
    );
    const provincia = provincias.find(
      (provincia) => provincia.id === asociado.direccion.provincia_id
    );
    const entregasRopaArray = Object.values(entregasRopaById);
  
    const entregaRopa = entregasRopaArray.filter(
      (entrega) => entrega.asociado_id === asociado.id
    );
  
    documentacionesArray = Object.values(documentacionesArray)
  
  
    const documentacion = documentacionesArray.find(
      (doc) => doc.id === asociado.documentacion_id
    );
    const tipoTelefono = tiposTelefonos.find(
      (tipo) => tipo.id === parseInt(asociado.telefono.tipo_telefono_id)
    );
    const estadoCivil = estadosCiviles.find(
      (tipo) => tipo.id === parseInt(asociado.estado_civil_id)
    );
  
    return {
      ...asociado,
      barrio: barrio || {},
      localidad: localidad || {},
      provincia: provincia || {},
      entregas_ropa: entregaRopa || [],
      documentacion: documentacion || [],
      tipo_telefono: tipoTelefono || {},
      estado_civil: estadoCivil || {},
    };
  };
  