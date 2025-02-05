
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { IoAdd } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { Alerta } from "../../shared/Alerta";
import * as Yup from "yup";
import { entregaRopaAsociadoSchema } from "../../utilities/validator/asociado/entregaRopaAsociadoSchema";
import { makeSelectEntregaRopaById } from "../../../store/selectors/EntregaRopaSelectors";
import { makeSelectLineasEnriquecidasByEntregaRopaId } from "../../../store/selectors/LineasEntregaRopaSelectors";
import { mapLineaEntregaRopa } from "../../utilities/mappers/mapLineaEntregaRopa";
import { createEntregaRopa, updateEntregaRopa } from "../../../store/thunks/EntregaRopathunks";

export const EntregaRopaForm = ({ editMode }) => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Si estamos en edición, obtenemos el id numérico de la entrega
  const entregaRopaId = editMode ? parseInt(id, 10) : null;
  
  // Seleccionamos la entrega en modo edición (en caso de que editMode sea true)
  const entregaRopa = editMode 
    ? useSelector(makeSelectEntregaRopaById(entregaRopaId))
    : null;
  
  // Selector para obtener las líneas enriquecidas de la entrega (usando el helper que ya las enriquece)
  const selectLineasEnriquecidas = useMemo(
    () => (entregaRopaId ? makeSelectLineasEnriquecidasByEntregaRopaId(entregaRopaId) : () => []),
    [entregaRopaId]
  );
  const enrichedLineas = useSelector(selectLineasEnriquecidas);
  
  // Obtenemos las listas de prendas, tipos de prendas y talles de una sola vez
  const { prendas, tiposPrendas, talles } = useSelector((state) => state.prendas);
  
  // Construir el initialValues usando useMemo para que se reevalúe cuando cambien los datos
  const initialValues = useMemo(() => {
    return {
      descripcion: editMode && entregaRopa ? entregaRopa.descripcion : "",
      // Para asociado_id, en edición se extrae de la entrega; en creación, podrías obtenerlo de la URL o props
      asociado_id: editMode && entregaRopa ? entregaRopa.asociado_id : id,
      lineas:
        editMode && entregaRopa && enrichedLineas && enrichedLineas.length > 0
          ? enrichedLineas.map((linea) => {
              // Usamos el helper para "enriquecer" la línea y luego extraer los campos necesarios
              const enriched = mapLineaEntregaRopa(linea, prendas, tiposPrendas, talles);
              return {
                prenda_id: enriched.prenda.id ? String(enriched.prenda.id) : "",
                cantidad: enriched.cantidad || "",
                tipo_prenda_id: enriched.prenda.tipo_prenda && enriched.prenda.tipo_prenda.id 
                  ? String(enriched.prenda.tipo_prenda.id) 
                  : "",
                talle_id: enriched.prenda.talle && enriched.prenda.talle.id 
                  ? String(enriched.prenda.talle.id) 
                  : "",
              };
            })
          : [
              {
                prenda_id: "",
                cantidad: "",
                tipo_prenda_id: "",
                talle_id: "",
              },
            ],
    };
  }, [editMode, entregaRopa, enrichedLineas, prendas, tiposPrendas, talles]);

  const validationSchema = entregaRopaAsociadoSchema.concat(
    Yup.object().shape({
      lineas: Yup.array().of(
        Yup.object().shape({
          prenda_id: Yup.number().required("Prenda es obligatoria"),
          cantidad: Yup.number()
            .required("Cantidad es obligatoria")
            .min(1, "La cantidad debe ser al menos 1")
            .test(
              "stock-test",
              "No hay suficiente stock para esta prenda",
              function (value, context) {
                const prendaId = context.parent.prenda_id;
                const prenda = prendas.find((p) => p.id === prendaId);
                return prenda ? prenda.stock >= value : true;
              }
            ),
        })
      ),
    })
  );

  const handleSubmit = () => {
    if (editMode) {
      dispatch(
        updateEntregaRopa(entregaRopa.id, formik.values, navigate)
      );
    } else {
      dispatch(createEntregaRopa(formik.values, navigate ));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Permite reinyectar valores cuando editMode es true y los datos están disponibles
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  // Helper para obtener las opciones de talles disponibles para un tipo de prenda
  const getAvailableTallesOptions = (tipoPrendaId) => {
    if (!tipoPrendaId) return [];
    // Filtrar las prendas que tengan el tipo seleccionado
    const filteredPrendas = prendas.filter(
      (prenda) => prenda.tipo_prenda_id === parseInt(tipoPrendaId, 10)
    );
    // Extraer y deduplicar los talles disponibles
    const availableTallesIds = Array.from(new Set(filteredPrendas.map((p) => p.talle_id)));
    return availableTallesIds
      .map((id) => talles.find((t) => t.id === id))
      .filter(Boolean);
  };

  const addLine = () => {
    formik.setValues({
      ...formik.values,
      lineas: [
        ...formik.values.lineas,
        { prenda_id: "", cantidad: "", tipo_prenda_id: "", talle_id: "" },
      ],
    });
  };

  const removeLine = (index) => {
    const updatedLineas = [...formik.values.lineas];
    updatedLineas.splice(index, 1);
    if (updatedLineas.length === 0) {
      updatedLineas.push({ prenda_id: "", cantidad: "", tipo_prenda_id: "", talle_id: "" });
    }
    formik.setValues({
      ...formik.values,
      lineas: updatedLineas,
    });
  };

  const handleTipoPrendaChange = (index, event) => {
    const { value } = event.target;
    formik.setFieldValue(`lineas[${index}].tipo_prenda_id`, value);
    formik.setFieldValue(`lineas[${index}].talle_id`, ""); // Limpiar el talle
    formik.setFieldValue(`lineas[${index}].prenda_id`, ""); // Limpiar prenda_id al cambiar el tipo
  };

  const handleTalleChange = (index, event) => {
    const { value } = event.target;
    formik.setFieldValue(`lineas[${index}].talle_id`, value);

    // Calcular el prenda_id basándose en tipo_prenda_id y talle_id
    const tipoPrendaId = formik.values.lineas[index].tipo_prenda_id;
    const talleId = value;
    const selectedPrenda = prendas.find(
      (prenda) =>
        prenda.tipo_prenda_id === parseInt(tipoPrendaId, 10) &&
        prenda.talle_id === parseInt(talleId, 10)
    );
    if (selectedPrenda) {
      formik.setFieldValue(`lineas[${index}].prenda_id`, selectedPrenda.id);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="text-gray-700 text-sm text-center">
        <span>Los campos marcados con * son obligatorios</span>
      </div>
      <div className="mb-4">
        <label className="text-slate-800" htmlFor="descripcion">
          Descripción*
        </label>
        <input
          type="text"
          id="descripcion"
          className="mt-2 w-full p-3 bg-gray-200"
          name="descripcion"
          placeholder="Puedes agregar descripción aquí"
          onChange={formik.handleChange}
          value={formik.values.descripcion}
        />
        {formik.errors.descripcion && (
          <Alerta error={formik.errors.descripcion} />
        )}
      </div>

      {formik.values.lineas.map((linea, index) => (
        <div key={index} className="flex justify-between gap-5 items-center mb-4">
          <div className="w-2/4">
            <label className="text-slate-800" htmlFor={`lineas[${index}].tipo_prenda_id`}>
              Tipo de prenda*
            </label>
            <select
              name={`lineas[${index}].tipo_prenda_id`}
              id={`lineas[${index}].tipo_prenda_id`}
              className="mt-2 w-full p-3 bg-gray-200"
              onChange={(e) => handleTipoPrendaChange(index, e)}
              value={formik.values.lineas[index].tipo_prenda_id}
            >
              <option value="">Seleccione un tipo de prenda</option>
              {tiposPrendas.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre_tipo_prenda}
                </option>
              ))}
            </select>
            {formik.errors.lineas &&
              formik.errors.lineas[index]?.tipo_prenda_id && (
                <Alerta error={formik.errors.lineas[index].tipo_prenda_id} />
              )}
          </div>
          <div className="w-2/4">
            <label className="text-slate-800" htmlFor={`lineas[${index}].talle_id`}>
              Talle*
            </label>
            <select
              name={`lineas[${index}].talle_id`}
              id={`lineas[${index}].talle_id`}
              className="mt-2 w-full p-3 bg-gray-200"
              onChange={(e) => handleTalleChange(index, e)}
              value={formik.values.lineas[index].talle_id}
              disabled={!formik.values.lineas[index].tipo_prenda_id}
            >
              <option value="">Seleccione un talle</option>
              {formik.values.lineas[index].tipo_prenda_id && 
                getAvailableTallesOptions(formik.values.lineas[index].tipo_prenda_id, prendas, talles)
                  .map((talle) => (
                    <option key={talle.id} value={talle.id}>
                      {talle.nombre_talle}
                    </option>
                  ))
              }
            </select>
            {formik.errors.lineas && formik.errors.lineas[index]?.talle_id && (
              <Alerta error={formik.errors.lineas[index].talle_id} />
            )}
          </div>
          <div className="w-1/4">
            <label className="text-slate-800" htmlFor={`lineas[${index}].cantidad`}>
              Cantidad*
            </label>
            <input
              type="number"
              id={`lineas[${index}].cantidad`}
              className="mt-2 w-full p-3 bg-gray-200"
              name={`lineas[${index}].cantidad`}
              placeholder="Cantidad"
              onChange={formik.handleChange}
              value={formik.values.lineas[index].cantidad}
              disabled={!formik.values.lineas[index].talle_id}

            />
            {formik.errors.lineas && formik.errors.lineas[index]?.cantidad && (
              <Alerta error={formik.errors.lineas[index].cantidad} />
            )}
          </div>
          <button
            type="button"
            onClick={() => removeLine(index)}
            className="mt-7 p-3 text-2xl text-red-800"
          >
            <IoIosRemoveCircleOutline />
          </button>
        </div>
      ))}
      <button type="button" onClick={addLine} className="mt-2 p-3 text-2xl text-sky-800">
        <IoAdd />
      </button>
      {formik.errors.lineas && typeof formik.errors.lineas === "string" && (
        <Alerta error={formik.errors.lineas} />
      )}
      <input
        type="submit"
        value={editMode ? "Actualizar entrega" : "Registrar entrega"}
        className="bg-sky-800 hover:bg-sky-950 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      />
    </form>
  );
};

