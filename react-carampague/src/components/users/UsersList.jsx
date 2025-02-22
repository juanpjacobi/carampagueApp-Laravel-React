import { UsersListItem } from "./UsersListItem";

export const UsersList = ({ users }) => {
  return (
    <div className="flex flex-col mt-2 space-y-4">
      <div className="flex flex-col shadow-md md:shadow-gray-500">
      <table className="w-full text-sm text-left min-w-full border-collapse block md:table">
      <thead className="text-sm  text-slate-700 uppercase bg-slate-200 block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Usuario
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Rol
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Activo
              </th>
              <th
                scope="col"
                className=" p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group ">
            {users?.map((user) => (
              <UsersListItem user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
