import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import { useAsociados, useValoresMapping } from "../../hooks";
import { ComputosList } from "../../components/computos/ComputosList";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { ComputosResumen } from "../../components/computos/ComputosResumen";
import { AjustesResumen } from "../../components/ajustes/AjustesResumen";
import { createRecibo } from "../../store/thunks/RecibosThunks";
import Swal from "sweetalert2";
import { selectAllRecibos } from "../../store/selectors/RecibosSelectors";
import { RecibosList } from "../../components/recibos/RecibosList";

export const Recibos = () => {
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

  const allRecibos = useSelector(selectAllRecibos);

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

  const filteredRecibos = useMemo(() => {
    if (!month || !year) return [];
    return allRecibos.filter((recibo) => {
      const matchPeriodo = recibo.periodo === targetPeriod;
      if (selectedAsociado) {
        return matchPeriodo && Number(recibo.asociado_id) === Number(selectedAsociado.id);
      }
      return matchPeriodo;
    });
  }, [allRecibos, selectedAsociado, month, year]);

  return (
    <div>
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Recibos
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
        {filteredRecibos.length > 0 ? (
          <div className="flex flex-col mt-2">
            <RecibosList recibos={filteredRecibos} />
          </div>
        ) : (
          <Alerta
            error={
              "No hay recibos para este asociado en el periodo seleccionado."
            }
          />
        )}
      </div>
    </div>
  );
};
