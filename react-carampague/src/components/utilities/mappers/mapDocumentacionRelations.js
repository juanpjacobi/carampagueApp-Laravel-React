// src/redux/selectors/mappers/mapDocumentacionRelations.js

export const mapDocumentacionRelations = (documentacion) => ({
    ...documentacion,
    lineaDocumentacionIds: documentacion.lineas_documentacion.map(linea => linea.id),
  });
  