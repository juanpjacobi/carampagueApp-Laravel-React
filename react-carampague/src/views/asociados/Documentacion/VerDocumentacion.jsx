import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DocumentacionCard } from "../../../components/asociados/documentacion/DocumentacionCard";
import { makeSelectLineaDocumentacionById } from "../../../store/selectors/LineasDocumentacionSelectors";

export const VerDocumentacion = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const linea = useSelector(makeSelectLineaDocumentacionById(id));
  console.log(linea)

  useEffect(() => {
    if (!linea) {
      navigate("/asociados", { replace: true });
    }
  }, [linea, navigate]);

  if (!linea) return null;
  
  return <DocumentacionCard linea={linea} />;
};
