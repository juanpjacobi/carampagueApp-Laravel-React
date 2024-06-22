import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { IoAdd } from "react-icons/io5";
import { Alerta } from "../../shared/Alerta";
import {
  createEntregaRopa,
  getPrendas,
  updateEntregaRopa,
} from "../../../functions/EntregaRopa/entregaRopa";
import * as Yup from "yup";
import { entregaRopaAsociadoSchema } from "../../utilities/validator/asociado/entregaRopaAsociadoSchema";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export const EntregaRopaForm = ({ editMode }) => {
  const { selectedAsociado } = useSelector((state) => state.asociados);
  const { id } = useParams(); // Asumimos que el ID de la entrega viene como parámetro de ruta

  const entregaRopa = selectedAsociado.entrega_ropa.find(
    (entrega) => entrega.id === parseInt(id)
  );
  const navigate = useNavigate();

  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    loadPrendas();
  }, []);

  const loadPrendas = async () => {
    const { data } = await getPrendas();
    setPrendas(data.prendas);
  };

  const initialState = {
    descripcion: editMode && entregaRopa ? entregaRopa.descripcion : "",
    asociado_id: selectedAsociado?.id || "",
    lineas:
      editMode && entregaRopa
        ? entregaRopa.lineas
        : [{ prenda_id: "", cantidad: "" }],
  };

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

  const handleSubmit = async () => {
    if (editMode) {
      return updateEntregaRopa(
        formik.values,
        navigate,
        entregaRopa.id,
        selectedAsociado.id
      );
    }
    createEntregaRopa(formik.values, navigate, selectedAsociado.id);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const addLine = () => {
    formik.setValues({
      ...formik.values,
      lineas: [...formik.values.lineas, { prenda_id: "", cantidad: "" }],
    });
  };

  const removeLine = (index) => {
    const lineas = [...formik.values.lineas];
    lineas.splice(index, 1);
    if (lineas.length === 0) {
      lineas.push({ prenda_id: "", cantidad: "" });
    }
    formik.setValues({
      ...formik.values,
      lineas,
    });
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
        <div
          key={index}
          className="flex justify-between gap-5 items-center mb-4"
        >
          <div className="w-2/4">
            <label
              className="text-slate-800"
              htmlFor={`lineas[${index}].prenda_id`}
            >
              Prenda*
            </label>
            <select
              name={`lineas[${index}].prenda_id`}
              id={`lineas[${index}].prenda_id`}
              className="mt-2 w-full p-3 bg-gray-200"
              onChange={formik.handleChange}
              value={formik.values.lineas[index].prenda_id}
            >
              <option value="">Seleccione una prenda</option>
              {prendas?.map((prenda) => (
                <option key={prenda.id} value={prenda.id}>
                  {prenda.tipo_prenda.nombre_tipo_prenda} |{" "}
                  {prenda.talle.nombre_talle}
                </option>
              ))}
            </select>
            {formik.errors.lineas && formik.errors.lineas[index]?.prenda_id && (
              <Alerta error={formik.errors.lineas[index].prenda_id} />
            )}
          </div>
          <div className="w-1/4">
            <label
              className="text-slate-800"
              htmlFor={`lineas[${index}].cantidad`}
            >
              Cantidad*
            </label>
            <input
              type="number"
              id={`lineas[${index}].cantidad`}
              className="mt-2 w-full p-3 bg-gray-200"
              name={`lineas[${index}].cantidad`}
              placeholder="Puedes agregar cantidad aquí"
              onChange={formik.handleChange}
              value={formik.values.lineas[index].cantidad}
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
      <button
        type="button"
        onClick={addLine}
        className="mt-2 p-3 text-2xl text-sky-800"
      >
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
