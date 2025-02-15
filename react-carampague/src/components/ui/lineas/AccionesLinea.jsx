import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import clsx from "clsx";
import { makeSelectMotivosByLineaId } from "../../../store/selectors/MotivosSelectors";
import { useSelector } from "react-redux";

export const AccionesLinea = ({
  linea,
  isPlanDiario,
  onEditLinea,
  handleToggleValidado,
  handleInvalidarLinea,
  handleEditarMotivo,
  handleEliminarLinea,
}) => {
  const motivosForLinea = useSelector(makeSelectMotivosByLineaId(linea.id));
  const isLineaGenerada = !linea.linea_original_id; // Línea generada desde el plan diario

  return (
    <div className="flex md:flex-col flex-row justify-between md:justify-around items-center md:items-start">
      <span className="inline-block w-1/3 md:hidden font-bold">Acciones</span>
      <div className="flex gap-2 items-center text-red">
        {!isPlanDiario && (
          <button
            onClick={() => onEditLinea(linea)}
            className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-800"
          >
            <AiFillEdit size={20} />
          </button>
        )}
        {isPlanDiario && (
          <>
            {linea.is_validado === null && (
              <button
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => {
                  if (!linea.asociado_id) {
                    Swal.fire({
                      icon: "error",
                      title: "Línea sin asociado",
                      text: "No se puede validar una línea sin asociado.",
                    });
                    return;
                  }
                  handleToggleValidado(true);
                }}
              >
                Validar
              </button>
            )}

            {/* Invalidar */}
            {linea.is_validado === true && isLineaGenerada === false && (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={handleInvalidarLinea} // Solo abre el modal
              >
                Invalidar
              </button>
            )}

            {/* Revertir */}
            {linea.is_validado === false && (
              <div className="flex gap-2 justify-between">
                <button
                  className="bg-blue-400 text-white px-2 py-1 rounded"
                  onClick={() => handleToggleValidado(null, { revertir: true })}
                >
                  Revertir
                </button>
                <button
                  onClick={() => {
                    if (motivosForLinea && motivosForLinea.length > 0) {
                      handleEditarMotivo(motivosForLinea[0]);
                    } else {
                      console.error("La línea no tiene motivos asignados.");
                    }
                  }}
                  className="bg-sky-600 text-white px-2 py-1 rounded hover:bg-sky-800"
                >
                  Motivo
                </button>
              </div>
            )}
          </>
        )}
        {/* Eliminar en planificación (si es una línea planificada) */}
        {!isPlanDiario && linea.is_planificado === true && (
          <button
            onClick={handleEliminarLinea}
            className={clsx(
              "text-white",
              isPlanDiario
                ? "bg-red-600 px-2 py-1 rounded"
                : "bg-red-600 p-2 hover:bg-red-800 rounded-full"
            )}
          >
            <AiOutlineDelete size={20} />
          </button>
        )}

        {isPlanDiario && isLineaGenerada && (
          <button
            onClick={handleEliminarLinea}
            className={clsx(
              "text-white",
              isPlanDiario
                ? "bg-red-600 px-2 py-1 rounded"
                : "bg-red-600 p-2 hover:bg-red-800 rounded-full"
            )}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
