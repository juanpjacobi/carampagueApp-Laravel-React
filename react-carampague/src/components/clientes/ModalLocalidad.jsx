import React, { useState } from "react";
import { createLocalidad } from "../../functions/Localidad/localidad";

const ModalLocalidad = ({
  setShowModal,
  showModal,
  provincias,
  loadLocalidades
}) => {
  const [localidad, setLocalidad] = useState({});
  

  const handleClick = async() => {
    await createLocalidad(localidad);
    loadLocalidades();
    setShowModal(false);

  };
  const handleClose = () => {
    setShowModal(false);
    setLocalidad("");
  };
  const handleChange = (e) => {
    setLocalidad({...localidad, [e.target.name]: e.target.value});
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font=semibold">Crear localidad</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Nombre localidad
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full 
                        py-2 px-1 text-black mb-2"
                        type="text"
                        name="nombre_localidad"
                        id="nombre_localidad"
                      onChange={handleChange}
                    />
                    <label className="block text-black text-sm font-bold" htmlFor="provincia_id">
                      Provincia
                    </label>
        
                    <select
                      name="provincia_id"
                      id="provincia_id"
                      className="mt-2 w-full p-3 bg-white"
                      onChange={handleChange}
                    >
                      <option value=""> Seleccione uno</option>
                      {provincias?.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className=" text-white bg-indigo-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleClick}
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalLocalidad;
