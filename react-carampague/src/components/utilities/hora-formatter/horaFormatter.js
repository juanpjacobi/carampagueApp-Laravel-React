export const formatFechaConDia = (fecha) => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
  
    const dateStr = fecha + "T00:00:00";
    const dateObj = new Date(dateStr);
    const diaNombre = diasSemana[dateObj.getDay()];
    const dia = dateObj.getDate().toString().padStart(2, "0");
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const anio = dateObj.getFullYear().toString().slice(2);
    return `${diaNombre} ${dia}/${mes}/${anio}`;
  };
  
  export const normalizarHora = (horaStr) => {
    if (!horaStr) return null;
    const [h, m] = horaStr.split(":");
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  };