import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import { useAsociados, useValoresMapping } from "../../hooks";
import { ComputosList } from "../../components/computos/ComputosList";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { selectAllLineasServicio } from "../../store/selectors/ServiciosSelectors";
import { ComputosResumen } from "../../components/computos/ComputosResumen";
import { selectEnrichedAjustes } from "../../store/selectors/AjustesSelectors";
import { AjustesResumen } from "../../components/ajustes/AjustesResumen";
import { createRecibo } from "../../store/thunks/RecibosThunks";
import Swal from 'sweetalert2';


export const Computos = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useDispatch();
  const { asociados } = useSelector((state) => state.asociados);
  const [selectedAsociado, setSelectedAsociado] = useState(null);

  const {
    asociadoQuery,
    setAsociadoQuery,
    filteredAsociados,
    showDropdown,
    setShowDropdown,
    inputRef,
  } = useAsociados(asociados, selectedAsociado);

  const allLineas = useSelector(selectAllLineasServicio);
  const enrichedAjustes = useSelector(selectEnrichedAjustes);

  const handleSelectAsociado = (id, fullName) => {
    setSelectedAsociado({ id, fullName });
    setAsociadoQuery(fullName);
    setShowDropdown(false);
  };

  const handleDesasignarAsociado = async () => {
    setSelectedAsociado(null);
    setAsociadoQuery("");
  };
  const formattedMonth = month.padStart(2, "0");
  const targetPeriod = `${year}-${formattedMonth}`;
  const filteredLineas = useMemo(() => {
    if (!selectedAsociado || !month || !year) return [];
    return allLineas.filter((linea) => {
      const [anio, mes] = linea.fecha.split("-");
      const lineaPeriod = `${anio}-${mes}`;
      return (
        Number(linea.asociado_id) === Number(selectedAsociado.id) &&
        lineaPeriod === targetPeriod &&
        linea.is_planificado === false &&
        linea.is_validado === true
      );
    });
  }, [selectedAsociado, month, year, allLineas]);

  const filteredJustifiedLineas = useMemo(() => {
    if (!selectedAsociado || !year || !month) return [];
    return allLineas.filter((linea) => {
      const [anio, mes] = linea.fecha.split("-");
      const lineaPeriod = `${anio}-${mes}`;
      return (
        Number(linea.asociado_id) === Number(selectedAsociado.id) &&
        lineaPeriod === targetPeriod &&
        linea.is_planificado === false &&
        linea.is_validado === false &&
        linea.is_justificado === true
      );
    });
  }, [selectedAsociado, year, month, allLineas]);

  const uniqueServiceIds = useMemo(() => {
    const ids = new Set();
    filteredLineas.forEach((linea) => {
      if (linea.servicio_id) ids.add(linea.servicio_id);
    });
    return Array.from(ids);
  }, [filteredLineas]);

  const periodo = `${year}-${month.padStart(2, "0")}`;
  const valoresMapping = useValoresMapping(uniqueServiceIds, periodo);

  const calculos = useMemo(() => {
    const groups = {};
    let totalBruto = 0;
    filteredLineas.forEach((linea) => {
      const valor = Number(valoresMapping[linea.servicio_id]) || 0;
      const horas = Number(linea.horas_reales) || 0;
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

  const calculosJustificados = useMemo(() => {
    const groups = {};
    let totalBrutoJustificado = 0;
    filteredJustifiedLineas.forEach((linea) => {
      const valorBase = Number(valoresMapping[linea.servicio_id]) || 0;
      const valorJustificado = valorBase * 0.67;
      const horas = Number(linea.horas_reales) || 0;
      const subtotal = valorJustificado * horas;
      if (!groups[valorJustificado]) {
        groups[valorJustificado] = {
          valorHora: valorJustificado,
          totalHoras: 0,
          subtotal: 0,
        };
      }
      groups[valorJustificado].totalHoras += horas;
      groups[valorJustificado].subtotal += subtotal;
      totalBrutoJustificado += subtotal;
    });
    return { grupos: Object.values(groups), totalBruto: totalBrutoJustificado };
  }, [filteredJustifiedLineas, valoresMapping]);

  const filteredAjustesForDiscounts = useMemo(() => {
    if (!selectedAsociado || !year || !month) return [];
    return enrichedAjustes
      .filter((ajuste) => {
        if (!ajuste.periodo_inicio) return false;
        return (
          targetPeriod >= ajuste.periodo_inicio &&
          targetPeriod <= ajuste.periodo_fin
        );
      })
      .filter((ajuste) => {
        if (selectedAsociado) {
          // Se incluyen ajustes globales o los que pertenecen al asociado seleccionado
          return (
            ajuste.global ||
            Number(ajuste.asociado_id) === Number(selectedAsociado.id)
          );
        }
        return true;
      });
  }, [enrichedAjustes, targetPeriod, selectedAsociado, year, month]);

  const discountAdjustments = useMemo(() => {
    return filteredAjustesForDiscounts.filter(
      (ajuste) => !ajuste.tipo_ajuste.add
    );
  }, [filteredAjustesForDiscounts]);


  const totalAjustes = useMemo(() => {
    return filteredAjustesForDiscounts.reduce((sum, ajuste) => {
      const montoEffective =
        Number(ajuste.monto) || Number(ajuste.tipo_ajuste.monto);
      return ajuste.tipo_ajuste.add ? sum + montoEffective : sum - montoEffective;
    }, 0);
  }, [filteredAjustesForDiscounts]);

  const linea_ids = useMemo(() => {
    return filteredLineas.map((linea) => linea.id);
  }, [filteredLineas]);

  const ajuste_ids = useMemo(() => {
    return filteredAjustesForDiscounts.map((ajuste) => ajuste.id);
  }, [filteredAjustesForDiscounts]);

  const handleGenerarRecibo = async () => {
    if (!selectedAsociado || !month || !year) {
      Swal.fire({
        icon: 'error',
        title: "Debe seleccionar un asociado y un período válido",
        text: 'Error',
      });
      return;
    }

    const payload = {
      asociado_id: selectedAsociado.id,
      periodo: `${year}-${month.padStart(2, "0")}`,
      linea_ids,
      ajuste_ids,
    };

      const recibo = await dispatch(createRecibo(payload));

  };
  

  return (
    <div>
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Cómputos
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <span className="font-bold text-md">Seleccione un Asociado:</span>
          <AsociadoDropdown
            asociadoQuery={asociadoQuery}
            setAsociadoQuery={setAsociadoQuery}
            filteredAsociados={filteredAsociados}
            handleSelectAsociado={handleSelectAsociado}
            handleDesasignarAsociado={handleDesasignarAsociado}
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

      <div>
        {filteredLineas.length > 0 ? (
          <div className="flex flex-col mt-2">
            <ComputosList
              lineas={filteredLineas}
              valoresMapping={valoresMapping}
            />

            <ComputosResumen
              title={"Resumen de cómputos"}
              grupos={calculos.grupos}
              totalBruto={calculos.totalBruto}
            />
          </div>
        ) : (
          <Alerta
            error={
              "No hay líneas para este asociado en el periodo seleccionado."
            }
          />
        )}
        <hr className="my-8 border-t-2 border-dashed border-gray-400" />
        <h2 className="text-2xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5 mt-5">
          Ausentismo
        </h2>
        {filteredJustifiedLineas.length > 0 ? (
          <div className="mt-5">
            <ComputosList
              lineas={filteredJustifiedLineas}
              valoresMapping={valoresMapping}
            />
            <ComputosResumen
              title={"Resumen de ausentismo"}
              grupos={calculosJustificados.grupos}
              totalBruto={calculosJustificados.totalBruto}
            />
          </div>
        ) : (
          <Alerta
            className="mt-5"
            error={
              "No hay líneas de ausentismo en el periodo y asociado seleccionado."
            }
          />
        )}
      </div>
      {/* Sección de Descuentos */}
      <hr className="my-8 border-t-2 border-dashed border-gray-400" />
      <h2 className="text-2xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5 mt-5">
        Descuentos
      </h2>
      {discountAdjustments.length > 0 ? (
        <div className="mt-5">
          <AjustesResumen
            title={"Resumen de descuentos"}
            ajustes={filteredAjustesForDiscounts}
            totalNeto={totalAjustes}
          />
        </div>
      ) : (
        <Alerta
          className="mt-5"
          error={"No hay descuentos para el asociado y periodo seleccionado."}
        />
      )}
      {/* Sección de Total Neto (líneas trabajadas - descuentos) */}
      <div className="flex items-center justify-center my-10">
        <span className="bg-green-700 text-white rounded-full px-4 py-2 text-lg font-bold">
        Total Neto: ${ (calculos.totalBruto + totalAjustes).toLocaleString() }
        </span>
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={handleGenerarRecibo}
          className="bg-sky-600 hover:bg-sky-800 text-white px-6 py-3 rounded uppercase font-bold"
        >
          Generar Recibo
        </button>
      </div>
    </div>
  );
};
