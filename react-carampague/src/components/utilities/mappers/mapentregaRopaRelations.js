
export const mapEntregaRopaRelations = (entregaRopa) => ({
    ...entregaRopa,
    lineaEntregaRopaIds: entregaRopa.lineasEntregaRopa.map(linea => linea.id),
  });
  