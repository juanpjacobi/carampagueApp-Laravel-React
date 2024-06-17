import { Link } from "react-router-dom";
import { BsInfoSquareFill } from "react-icons/bs";


export const InfoIcon = ({ id, tipo }) => {
  return (
    <Link to={`/${tipo}/${id}`} className="flex justify-center text-teal-700">
      <BsInfoSquareFill size={25}/>
    </Link>
  );
};
