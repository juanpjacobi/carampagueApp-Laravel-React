import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { AusentismoList } from "../../components/ausentismo/AusentismoList";
import { useAsociados } from "../../hooks";
import { selectAllLineasServicio } from "../../store/selectors/ServiciosSelectors";
import { Info } from "../../components/shared/Info";

export const Ausentismo = () => {
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
  } = useAsociados(asociados, setSelectedAsociado);

  const allLineas = useSelector(selectAllLineasServicio);

  const handleSelectAsociado = (id, fullName) => {
    setSelectedAsociado({ id, fullName });
    setAsociadoQuery(fullName);
    setShowDropdown(false);
  };

  const handleDesasignarAsociado = async () => {
    setSelectedAsociado(null);

    setAsociadoQuery("");
  };

  // Filtramos las líneas por asociado (si se selecciona) y por periodo
  const filteredLineas = useMemo(() => {
    if (!month || !year) return [];
    const formattedMonth = month.padStart(2, "0");
    const targetPeriod = `${year}-${formattedMonth}`;
    return allLineas.filter((linea) => {
      const [anio, mes] = linea.fecha.split("-");
      const lineaPeriod = `${anio}-${mes}`;
      const matchPeriodo = lineaPeriod === targetPeriod;
      const matchAsociado = selectedAsociado
        ? Number(linea.asociado_id) === Number(selectedAsociado.id)
        : true;
      // Aquí filtramos las líneas invalidadas (is_validado === false)
      return matchPeriodo && matchAsociado && linea.is_validado === false;
    });
  }, [month, year, allLineas, selectedAsociado]);

  const handleToggleJustificado = (linea) => {
    // Llama a tu thunk para actualizar is_justificado en esa línea
    console.log("Toggle justificado para la línea:", linea.id);
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Ausentismo
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
        <>
          {filteredLineas.length > 0 ? (
            <AusentismoList
              lineas={filteredLineas}
              onToggleJustificado={handleToggleJustificado}
            />
          ) : (
            <div className="flex justify-center">
              <Alerta error="No hay líneas de ausentismo para el período y asociado seleccionado." />
            </div>
          )}
        </>
      )}
    </div>
  );
};
