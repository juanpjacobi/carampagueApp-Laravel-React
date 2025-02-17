import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import { Alerta } from "../../components/shared/Alerta";
import { selectEnrichedAjustes } from "../../store/selectors/AjustesSelectors";
import { selectAllTiposAjustes } from "../../store/selectors/TiposAjustesSelectors";
import { useAsociados } from "../../hooks/useAsociados";
import { AjusteFormModal } from "../../components/ajustes/AjusteFormModal";
import { AjusteList } from "../../components/ajustes/AjusteList";
import { Info } from "../../components/shared/Info";

export const Ajustes = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // modalInitialData se usará tanto para creación (datos por defecto) como para edición
  const [modalInitialData, setModalInitialData] = useState({});
  const [selectedTipo, setSelectedTipo] = useState(null);

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

  // Función para abrir el modal en modo creación
  const openModal = () => {
    setModalInitialData({
      global: false,
      asociado: selectedAsociado,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (ajuste) => {
    setModalInitialData({
      id: ajuste.id, // Esto indica que se trata de edición
      global: ajuste.global,
      tipoAjusteId: ajuste.tipo_ajuste.id,
      monto: ajuste.monto,
      periodoInicio: ajuste.periodo_inicio,
      duracionMeses: ajuste.duracion_meses,
      asociado:
        !ajuste.global && ajuste.asociado
          ? {
              id: ajuste.asociado.id,
              fullName: `${ajuste.asociado.nombre} ${ajuste.asociado.apellido}`,
            }
          : null,
    });
    setIsModalOpen(true);
  };

  const enrichedAjustes = useSelector(selectEnrichedAjustes);
  const tiposAjustes = useSelector(selectAllTiposAjustes);

  const handleSelectAsociado = (id, fullName) => {
    setSelectedAsociado({ id, fullName });
    setAsociadoQuery(fullName);
    setShowDropdown(false);
  };

  const handleDesasignarAsociado = () => {
    setSelectedAsociado(null);
    setAsociadoQuery("");
  };

  const formattedMonth = (month || "").padStart(2, "0");
  const targetPeriod = `${year}-${formattedMonth}`;

  const filteredAjustes = useMemo(() => {
    if (!year || !month) return [];
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
          return (
            ajuste.global ||
            Number(ajuste.asociado_id) === Number(selectedAsociado.id)
          );
        }
        return true;
      })
      .filter((ajuste) => {
        if (selectedTipo) {
          return Number(ajuste.tipo_ajuste.id) === Number(selectedTipo.id);
        }
        return true;
      });
  }, [
    enrichedAjustes,
    targetPeriod,
    selectedAsociado,
    selectedTipo,
    year,
    month,
  ]);

  const globalAjustes = useMemo(() => {
    return filteredAjustes.filter((ajuste) => ajuste.global);
  }, [filteredAjustes]);

  const individualAjustes = useMemo(() => {
    return filteredAjustes.filter((ajuste) => !ajuste.global);
  }, [filteredAjustes]);

  const totalMonto = useMemo(() => {
    return filteredAjustes.reduce((sum, ajuste) => {
      return sum + Number(ajuste.monto || 0);
    }, 0);
  }, [filteredAjustes]);

  return (
    <div>
      <h1 className="text-3xl underline underline-offset-8 text-sky-700 font-semibold text-center mb-5">
        Gestión de Ajustes
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
        <div className="w-full md:w-1/3">
          <MonthYearSelector
            month={month}
            year={year}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className="w-full md:w-1/3">
          <span className="font-bold text-md">Concepto:</span>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={selectedTipo ? selectedTipo.id : ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (selectedId === "") {
                setSelectedTipo(null);
              } else {
                const tipo = tiposAjustes.tiposAjustes[selectedId];
                setSelectedTipo(tipo);
              }
            }}
          >
            <option value="">Todos los Conceptos</option>
            {tiposAjustes.allIds.map((id) => (
              <option key={id} value={id}>
                {tiposAjustes.tiposAjustes[id].concepto}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!month || !year ? (
        <div className="flex justify-center">

          <Info message={"Elige un periodo"} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center my-10">
            <span className="bg-teal-800 text-white rounded-full px-3 py-1 text-sm">
              Total Monto: ${totalMonto.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={openModal}
              className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 uppercase font-bold cursor-pointer rounded"
            >
              Agregar Ajuste
            </button>
          </div>

          <div className="mt-8">
            {/* Sección para Ajustes Globales */}
            {globalAjustes.length > 0 && (
              <>
                <h2 className="text-2xl underline underline-offset-8 text-sky-700 font-semibold text-start mb-5 mt-5">
                  Ajustes Globales
                </h2>
                <AjusteList lineas={globalAjustes} onEdit={handleEdit} />
              </>
            )}

            {/* Sección para Ajustes Individuales */}
            {individualAjustes.length > 0 && (
              <>
                <h2 className="text-2xl underline underline-offset-8 text-sky-700 font-semibold text-start mb-5 mt-5">
                  Ajustes Individuales
                </h2>
                <AjusteList lineas={individualAjustes} onEdit={handleEdit} />
              </>
            )}

            {filteredAjustes.length === 0 && (
              <div className="flex justify-center">
                <Alerta error="No hay ajustes para el periodo/filtrado seleccionado." />
              </div>
            )}

            {isModalOpen && (
              <AjusteFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={modalInitialData}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
