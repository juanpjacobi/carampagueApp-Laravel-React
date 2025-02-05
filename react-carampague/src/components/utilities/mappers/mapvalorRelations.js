
export const mapValorRelations = (valor, clientes, objetivos) => {
    const cliente = clientes.find((cli) => cli.id === valor.cliente_id);
    const objetivo = valor.objetivo_id ? objetivos.find((obj) => obj.id === valor.objetivo_id) : null;
  
    return {
      ...valor,
      cliente: cliente || {},
      objetivo: objetivo || {},
    };
  };
  