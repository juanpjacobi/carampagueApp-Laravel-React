import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useObjetivos, useValoresMapping } from "../../hooks";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { selectAllLineasServicioEnriquecidas } from "../../store/selectors/ServiciosSelectors";
import { createFactura } from "../../store/thunks/FacturasThunks";
import { FacturasList } from "../../components/facturas/FacturasList";
import { FacturaResumen } from "../../components/facturas/FacturaResumen";
import Swal from "sweetalert2";
import { Info } from "../../components/shared/Info";
import { ObjetivoDropdown } from "../../components/objetivos/ObjetivoDropDown";
import { selectObjetivos } from "../../store/selectors/ObjetivosSelectors";

export const Facturas = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const {
    objetivoQuery,
    setObjetivoQuery,
    filteredObjetivos,
    showDropdown,
    setShowDropdown,
    inputRef,
    objetivoSeleccionado,
    setObjetivoSeleccionado,
  } = useObjetivos(null);

  const handleSelectObjetivo = (id, nombre) => {
    const obj = objetivos.find((o) => Number(o.id) === Number(id));
    setObjetivoQuery(nombre);
    setObjetivoSeleccionado(obj); 

    setShowDropdown(false);
  };

  const handleDesasignarObjetivo = () => {
    setObjetivoQuery("");
    setObjetivoSeleccionado(null);

  };

  const objetivos = useSelector(selectObjetivos);

  const allLineas = useSelector(selectAllLineasServicioEnriquecidas);

  const formattedMonth = (month || "").padStart(2, "0");
  const targetPeriod = `${year}-${formattedMonth}`;

  const filteredLineas = useMemo(() => {
    if (!objetivoSeleccionado || !month || !year) return [];
    return allLineas.filter((linea) => {
      const [anio, mes] = linea.fecha.split("-");
      const lineaPeriod = `${anio}-${mes}`;
      return (
        Number(linea.servicio.objetivo_id) === Number(objetivoSeleccionado.id) &&
        lineaPeriod === targetPeriod &&
        linea.is_planificado === true
      );
    });
  }, [objetivoSeleccionado, month, year, allLineas]);

  const uniqueServiceIds = useMemo(() => {
    const ids = new Set();
    filteredLineas.forEach((linea) => {
      if (linea.servicio_id) ids.add(linea.servicio_id);
    });
    return Array.from(ids);
  }, [filteredLineas]);

  const periodo = `${year}-${month.padStart(2, "0")}`;
  const valoresMapping = useValoresMapping(
    uniqueServiceIds,
    periodo,
    "cliente"
  );

  const calculos = useMemo(() => {
    const groups = {};
    let totalBruto = 0;
    filteredLineas.forEach((linea) => {
      const valor = Number(valoresMapping[linea.servicio_id]) || 0;
      const horas = Number(linea.horas_planificadas) || 0;
      const subtotal = valor * horas;
      if (!groups[valor]) {
        groups[valor] = { valorHora: valor, totalHoras: 0, subtotal: 0 };
      }
      groups[valor].totalHoras += horas;
      groups[valor].subtotal += subtotal;
      totalBruto += subtotal;
    });
    return { grupos: Object.values(groups), totalBruto };
  }, [filteredLineas, valoresMapping]);

  const linea_ids = useMemo(() => {
    return filteredLineas.map((linea) => linea.id);
  }, [filteredLineas]);

  const handleGenerarFactura = async () => {
    if (!objetivoSeleccionado || !month || !year) {
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar un objetivo y un período válido",
        text: "Error",
      });
      return;
    }

    const payload = {
      objetivo_id: objetivoSeleccionado.id,
      cliente_id: objetivoSeleccionado.cliente_id,
      periodo: `${year}-${month.padStart(2, "0")}`,
      linea_ids,
    };

    const factura = await dispatch(createFactura(payload));
  };



  return (
    <div>
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Diagramas facturación
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <label className="font-bold text-md">Seleccione un Objetivo:</label>
          <ObjetivoDropdown
            objetivoQuery={objetivoQuery}
            setObjetivoQuery={setObjetivoQuery}
            filteredObjetivos={filteredObjetivos}
            handleSelectObjetivo={handleSelectObjetivo}
            handleDesasignarObjetivo={handleDesasignarObjetivo}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            inputRef={inputRef}
          />
        </div>
        <MonthYearSelector
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
      </div>
      {!objetivoSeleccionado || !month || !year ? (
        <Info message={"Elige un periodo y un objetivo"} />
      ) : (
        <>
          <div>
            {filteredLineas.length > 0 ? (
              <>
                <div className="flex flex-col mt-2">
                  <FacturasList
                    lineas={filteredLineas}
                    valoresMapping={valoresMapping}
                  />

                  <FacturaResumen
                    title={"Resumen de factura"}
                    grupos={calculos.grupos}
                    totalBruto={calculos.totalBruto}
                  />
                </div>
                <hr className="my-8 border-t-2 border-dashed border-gray-400" />

                <div className="flex items-center justify-center my-10">
                  <span className="bg-green-700 text-white rounded-full px-4 py-2 text-lg font-bold">
                    Total Neto: ${calculos.totalBruto.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex justify-center my-10">
                    <button
                      onClick={handleGenerarFactura}
                      className="bg-sky-600 hover:bg-sky-800 text-white px-6 py-3 rounded uppercase font-bold"
                    >
                      Generar factura
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center mt-2">
                <Alerta
                  error={
                    "No hay horas facturables para este objetivo en el periodo seleccionado."
                  }
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
