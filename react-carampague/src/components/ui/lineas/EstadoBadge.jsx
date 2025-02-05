export const EstadoBadge = ({ isValidado }) => {
    const getBadgeColor = () => {
      if (isValidado === true) return "bg-green-500";
      if (isValidado === false) return "bg-red-500";
      return "bg-yellow-500";
    };
  
    const getBadgeText = () => {
      if (isValidado === true) return "VALIDADA";
      if (isValidado === false) return "INVALIDADA";
      return "PENDIENTE";
    };
  
    return (
      <span
        className={`inline-block px-1 py-1 rounded-full text-white text-xs font-bold min-w-full text-center ${getBadgeColor()}`}
      >
        {getBadgeText()}
      </span>
    );
  };
  