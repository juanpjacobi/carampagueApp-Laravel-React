import { Link } from "react-router-dom";

export const ServicioCard = ({ selectedServicio }) => {
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Feriado" // Representación del "Día Feriado" en la posición 7
  ];

  return (
    <div className="max-w-2xl p-5 w-full m-auto">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {selectedServicio?.nombre}
        </h1>

        <Link
          to={"/servicios/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atrás
        </Link>
      </div>

      <div className="bg-white flex flex-col md:flex-row justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-full md:w-3/4 md:border-r">
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">
              Descripción:
            </span>
            {selectedServicio?.descripcion}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">
              Objetivo:
            </span>
            {selectedServicio?.objetivo.nombre}
          </p>

          <div className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase">
              Modalidad:
            </span>
            <table className="w-full border-collapse bg-white text-left mt-4">
              <thead>
                <tr>
                  <th className="border-b border-slate-300 py-2 px-4 font-semibold text-slate-700">
                    Día
                  </th>
                  <th className="border-b border-slate-300 py-2 px-4 font-semibold text-slate-700">
                    Hora Inicio
                  </th>
                  <th className="border-b border-slate-300 py-2 px-4 font-semibold text-slate-700">
                    Hora Fin
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedServicio?.modalidades.map((modalidad, index) => {
                  // Obtener el nombre del día (si es 7, se muestra como "Feriado")
                  const nombreDiaBase = diasSemana[modalidad.dia_semana] ?? 'Día no definido';

                  // Determinar si el turno es diurno o nocturno basado en la hora de inicio
                  const horaInicio = parseInt(modalidad.hora_inicio.split(":")[0], 10);
                  const tipoTurno = horaInicio >= 18 ? " (Nocturno)" : " (Diurno)";

                  // Nombre del día con la información del turno
                  const diaConTurno = `${nombreDiaBase}${tipoTurno}`;

                  return (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="border-b border-slate-200 py-2 px-4">
                        {diaConTurno}
                      </td>
                      <td className="border-b border-slate-200 py-2 px-4">
                        {modalidad.hora_inicio}
                      </td>
                      <td className="border-b border-slate-200 py-2 px-4">
                        {modalidad.hora_fin}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col text-center">
          <span className="text-md mr-2 font-bold text-sky-800 uppercase">
            Acciones
          </span>
          <div className="flex flex-col h-full gap-2 md:justify-around">
            <Link
              to={`/servicios/edit/${selectedServicio?.id}`}
              className="p-2 w-full text-sm text-center bg-blue-600 hover:bg-blue-950 text-white rounded"
            >
              Editar
            </Link>
            <Link
              to={`/servicios/cobertura/${selectedServicio?.id}`}
              className="p-2 w-full text-sm text-center bg-green-600 hover:bg-green-950 text-white rounded"
            >
              Ver cobertura
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
