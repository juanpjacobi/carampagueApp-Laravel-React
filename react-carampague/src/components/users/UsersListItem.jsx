import { useDispatch, useSelector } from "react-redux";
import { updateUserActive, updateUserRole } from "../../store/thunks/UserThunks";
import { selectAllRoles } from "../../store/selectors/RolesSelectors";

export const UsersListItem = ({ user }) => {
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const currentUser = useSelector((state) => state.auth.user);

  // Determinar si la fila corresponde al usuario logueado
  const isOwnUser = currentUser && Number(currentUser.id) === Number(user.id);

  const handleToggleActivo = () => {
    if (!isOwnUser) {
      dispatch(updateUserActive(user.id, !user.activo));
    }
  };

  const handleChangeRole = (e) => {
    if (!isOwnUser) {
      const newRolId = e.target.value;
      dispatch(updateUserRole(user.id, newRolId));
    }
  };

  return (
    <tr className="bg-gray-100 p-5 border-b border-slate-300 md:bg-white mb-2 shadow-md shadow-gray-700 flex flex-col md:table-row">
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Usuario</span>
        {user.nombre_usuario.toUpperCase()}
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Rol</span>
        <select
          value={user.rol_id}
          onChange={handleChangeRole}
          className="border p-1 rounded"
          disabled={isOwnUser}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.nombre_rol}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-b flex justify-between border-slate-300 md:border-none text-left md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Estado</span>
        {user.activo ? "Activo" : "Inactivo"}
      </td>
      <td className="p-2 text-left flex justify-between md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Acciones</span>
        <button
          onClick={handleToggleActivo}
          className={`p-2 text-sm text-center ${
            user.activo
              ? "bg-red-600 hover:bg-red-950"
              : "bg-green-600 hover:bg-green-950"
          } text-white rounded`}
          disabled={isOwnUser}
        >
          {user.activo ? "Inactivar" : "Activar"}
        </button>
      </td>
    </tr>
  );
};
