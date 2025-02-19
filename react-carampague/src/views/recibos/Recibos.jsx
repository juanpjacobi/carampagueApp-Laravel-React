import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import { useAsociados } from "../../hooks";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { selectAllRecibos } from "../../store/selectors/RecibosSelectors";
import { RecibosList } from "../../components/recibos/RecibosList";
import { Info } from "../../components/shared/Info";

export const Recibos = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
  const formattedMonth = (month || "").padStart(2, "0");
  const targetPeriod = `${year}-${formattedMonth}`;

  const filteredRecibos = useMemo(() => {
    if (!month || !year) return [];
    return allRecibos.filter((recibo) => {
      const matchPeriodo = recibo.periodo === targetPeriod;
      if (selectedAsociado) {
        return (
          matchPeriodo &&
          Number(recibo.asociado_id) === Number(selectedAsociado.id)
        );
      }
      return matchPeriodo;
    });
  }, [allRecibos, selectedAsociado, month, year]);

  return (
    <div className="p-2">
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Recibos
      </h1>
      <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <div className="relative w-full md:w-1/3">
          <span className="font-bold text-md">Asociado:</span>
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
      {!month || !year ? (
        <Info message={"Elige un periodo"} />
      ) : (
        <div>
          {filteredRecibos.length > 0 ? (
            <div className="flex flex-col mt-2">
              <RecibosList recibos={filteredRecibos} />
            </div>
          ) : (
            <div className="flex justify-center">
              <Alerta
                error={
                  "No hay recibos para el periodo/asociado seleccionado."
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
