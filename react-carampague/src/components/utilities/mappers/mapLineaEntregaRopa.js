
export const mapLineaEntregaRopa = (linea, prendas, tiposPrendas, talles) => {
    const prenda = prendas.find(p => p.id === linea.prenda_id) || {};
  
    const tipoPrenda = prenda.tipo_prenda_id 
      ? tiposPrendas.find(tp => tp.id === prenda.tipo_prenda_id)
      : {};
  
    const talle = prenda.talle_id 
      ? talles.find(t => t.id === prenda.talle_id)
      : {};
  
    return {
      ...linea,
      prenda: {
        ...prenda,
        tipo_prenda: tipoPrenda || {},
        talle: talle || {},
      },
    };
  };
  