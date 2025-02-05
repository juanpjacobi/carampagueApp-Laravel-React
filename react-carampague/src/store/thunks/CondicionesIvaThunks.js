import carampagueApi from "../../api/carampagueApi";
// import { setCondicionesIva, addCondicionIva, updateCondicionIvaEnStore } from "../slices/CondicionesIvaSlice";
import { setCondicionesIva } from "../slices/CondicionesIvaSlice";


export const getCondicionesIva = () => async (dispatch) => {
  try {
    const { data } = await carampagueApi.get("/api/condiciones-iva");
    dispatch(setCondicionesIva(data.condiciones_iva));
  } catch (error) {
    console.error("Error fetching condiciones IVA:", error);
  }
};

// export const createCondicionIva = (data) => async (dispatch) => {
//   try {
//     const { data: newCondicion } = await carampagueApi.post("/api/condiciones-iva", data);
//     dispatch(addCondicionIva(newCondicion));
//   } catch (error) {
//     console.error("Error creating condicion IVA:", error);
//   }
// };

// export const updateCondicion = (id, data) => async (dispatch) => {
//   try {
//     const { data: updatedCondicion } = await carampagueApi.put(`/api/condiciones-iva/${id}`, data);
//     dispatch(updateCondicionIvaEnStore(updatedCondicion));
//   } catch (error) {
//     console.error("Error updating condicion IVA:", error);
//   }
// };
