import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { selectAllFacturas } from "../../store/selectors/FacturasSelectors";
import { FacturaClienteList } from "../../components/facturas/FacturaClienteList";
import { Info } from "../../components/shared/Info";
import { ClienteDropdown } from "../../components/clientes/ClienteDropDown";
import { useClientes } from "../../hooks";

export const AllFacturas = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { clientes } = useSelector((state) => state.clientes);
  const {
    clienteQuery,
    setClienteQuery,
    filteredClientes,
    showDropdown,
    setShowDropdown,
    inputRef,
    clienteSeleccionado,
  } = useClientes(null);

  const handleSelectCliente = (id, razon_social) => {
    setClienteQuery(razon_social);
    setShowDropdown(false);
  };

  const handleDesasignarCliente = () => {
    setClienteQuery("");
  };

  const allFacturas = useSelector(selectAllFacturas);

  const formattedMonth = (month || "").padStart(2, "0");
  const targetPeriod = `${year}-${formattedMonth}`;

  const filteredFacturas = useMemo(() => {
    if (!month || !year) return [];
    return allFacturas.filter((factura) => {
      const matchPeriodo = factura.periodo === targetPeriod;
      if (clienteSeleccionado) {
        return (
          matchPeriodo &&
          Number(factura.cliente_id) === Number(clienteSeleccionado.id)
        );
      }
      return matchPeriodo;
    });
  }, [allFacturas, clienteSeleccionado, month, year]);

  const handleClienteChange = (e) => {
    const id = e.target.value;
    const cli = clientes.find((c) => Number(c.id) === Number(id));
    setclienteSeleccionado(cli || null);
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Facturas
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <label className="font-bold text-md">Cliente:</label>
          <ClienteDropdown
            clienteQuery={clienteQuery}
            setClienteQuery={setClienteQuery}
            filteredClientes={filteredClientes}
            handleSelectCliente={handleSelectCliente}
            handleDesasignarCliente={handleDesasignarCliente}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </div>
        <MonthYearSelector
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
      </div>
      {!month || !year ? (
        <Info message={"Elige un periodo"} />
      ) : (
        <div>
          {filteredFacturas.length > 0 ? (
            <div className="flex flex-col mt-2">
              <FacturaClienteList facturas={filteredFacturas} />
            </div>
          ) : (
            <div className="flex justify-center mt-2">
              <Alerta
                error={"No hay facturas para el periodo/cliente seleccionado."}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
