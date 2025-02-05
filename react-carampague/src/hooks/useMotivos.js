import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleValidado } from "../store/thunks/LineasServiciosThunks";
import { updateMotivo } from "../store/thunks/MotivosThunks";

export const useMotivos = (linea) => {
  const dispatch = useDispatch();
  const { tiposMotivos } = useSelector((state) => state.tiposMotivos);
  const [motivoEditable, setMotivoEditable] = useState(null);
  const [showMotivoModal, setShowMotivoModal] = useState(false);

  const handleGuardarMotivo = async ({ tipo_motivo_id, observaciones }) => {
    try {
      if (motivoEditable) {
        await dispatch(updateMotivo(motivoEditable.id, { tipo_motivo_id, observaciones }));
      } else {
        await dispatch(toggleValidado(
          linea.id,
          false,
          { crear_linea_real: true, tipo_motivo_id, observaciones }
        ));
      }
      setShowMotivoModal(false);
      setMotivoEditable(null);
    } catch (error) {
      console.error("Error al guardar motivo:", error);
    }
  };

  const handleInvalidarLinea = () => {
    setMotivoEditable(linea.motivos?.[0] || null);
    setShowMotivoModal(true);
  };

  return {
    tiposMotivos,
    motivoEditable,
    setMotivoEditable,
    showMotivoModal,
    setShowMotivoModal,
    handleGuardarMotivo,
    handleInvalidarLinea,
  };
};
