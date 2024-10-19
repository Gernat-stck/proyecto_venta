import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoadingComponent from "./LoadingComponent";

const TableUser = ({
  loadingUsers,
  errorUsers,
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  if(loadingUsers && currentItems.length === 0){
    return <LoadingComponent />
  }
  return (
    <div className="px-3 py-4 flex justify-center">
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Nombre</th>
            <th className="text-left p-3 px-5">Usuario</th>
            <th className="text-left p-3 px-5">Contraseña</th>
            <th className="text-left p-3 px-5">Rol</th>
            <th></th>
          </tr>
          {!loadingUsers &&
            !errorUsers &&
            currentItems.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-orange-100 bg-gray-100"
              >
                <td className="p-3 px-5">
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="bg-transparent"
                    disabled
                  />
                </td>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    defaultValue={user.user_name}
                    className="bg-transparent"
                  />
                </td>
                <td className="p-3 px-5">
                  <input
                    type="password"
                    defaultValue="password"
                    className="bg-transparent"
                    max={8}
                    disabled
                  />
                </td>
                <td className="p-3 px-5">
                  <input
                    type="text"
                    defaultValue={user.rol}
                    className="bg-transparent"
                    disabled
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-sm bg-blue-500 hover:bg-blue-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outliine mr-5"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-sm mr-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
