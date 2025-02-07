import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAjuste } from "../../store/thunks/AjustesThunks";
import { selectAllTiposAjustes } from "../../store/selectors/TiposAjustesSelectors";
import { AsociadoDropdown } from "../../components/ui/lineas/AsociadoDropdown";
import MonthYearSelector from "../../components/utilities/month-year-selector/MonthYearSelector";
import Swal from "sweetalert2";

export const AjusteFormModal = ({ isOpen, onClose, initialData = {} }) => {
  const dispatch = useDispatch();
  const tiposAjustesState = useSelector(selectAllTiposAjustes);
  const tiposArray = tiposAjustesState.allIds.map(id => tiposAjustesState.tiposAjustes[id]);

  // Estados del formulario
  const [global, setGlobal] = useState(initialData.global || false);
  const [tipoAjusteId, setTipoAjusteId] = useState(initialData.tipoAjusteId || "");
  const [monto, setMonto] = useState(initialData.monto || "");
  const [periodoInicio, setPeriodoInicio] = useState(initialData.periodoInicio || "");
  const [duracionMeses, setDuracionMeses] = useState(initialData.duracionMeses || 1);
  const [selectedAsociado, setSelectedAsociado] = useState(initialData.asociado || null);

  // Si se cambia el tipo, se puede prellenar el monto con el valor por defecto
  useEffect(() => {
    if (tipoAjusteId && !monto) {
      const tipo = tiposArray.find(t => t.id === Number(tipoAjusteId));
      if (tipo) {
        setMonto(tipo.monto);
      }
    }
  }, [tipoAjusteId, monto, tiposArray]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar la data a enviar
    const data = {
      global,
      tipo_ajuste_id: tipoAjusteId,
      monto,
      periodo_inicio: periodoInicio,
      duracion_meses: duracionMeses,
      // Solo se envía asociado si no es global
      asociado_id: global ? null : (selectedAsociado ? selectedAsociado.id : null),
    };

    try {
      await dispatch(createAjuste(data));
      Swal.fire({
        icon: "success",
        title: "Ajuste creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose(); // Cerrar el modal al finalizar
    } catch (error) {
      // El error ya lo maneja el thunk con SweetAlert
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          {global ? "Agregar Descuento Global" : "Asignar Descuento Individual"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector de Tipo de Ajuste */}
          <div>
            <label className="block font-semibold mb-1">Tipo de Ajuste</label>
            <select
              value={tipoAjusteId}
              onChange={(e) => setTipoAjusteId(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Seleccione un tipo</option>
              {tiposArray.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.concepto} {tipo.add ? "(Suma)" : "(Resta)"}
                </option>
              ))}
            </select>
          </div>

          {/* Monto */}
          <div>
            <label className="block font-semibold mb-1">Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Periodo de Inicio */}
          <div>
            <label className="block font-semibold mb-1">Periodo de Inicio (YYYY-MM)</label>
            <input
              type="month"
              value={periodoInicio}
              onChange={(e) => setPeriodoInicio(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Duración en Meses */}
          <div>
            <label className="block font-semibold mb-1">Duración (meses)</label>
            <input
              type="number"
              value={duracionMeses}
              onChange={(e) => setDuracionMeses(e.target.value)}
              className="w-full border rounded p-2"
              min="1"
              required
            />
          </div>

          {/* Checkbox para indicar si es global */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="global"
              checked={global}
              onChange={(e) => setGlobal(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="global">Aplicar a todos (Global)</label>
          </div>

          {/* Si no es global, se muestra el selector de asociado */}
          {!global && (
            <div>
              <label className="block font-semibold mb-1">Asociado</label>
              <AsociadoDropdown
                asociadoQuery={selectedAsociado ? selectedAsociado.fullName : ""}
                setAsociadoQuery={() => {}}
                filteredAsociados={[]} // Puedes reutilizar tu hook o componente según corresponda
                handleSelectAsociado={(id, fullName) =>
                  setSelectedAsociado({ id, fullName })
                }
                handleDesasignarAsociado={() => setSelectedAsociado(null)}
                showDropdown={true}
                setShowDropdown={() => {}}
                inputRef={null}
              />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
