import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LoadingComponent from "./LoadingComponent";

const TableUser = ({
  loadingUsers,
  errorUsers,
  currentItems,
  handleEdit,
  handleDelete,
}) => {
  if (loadingUsers && currentItems.length === 0) {
    return <LoadingComponent />;
  }
  if (errorUsers) {
    return <div className="text-red-500 text-center">{errorUsers}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Contraseña</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell>
                  <Input
                    type="text"
                    defaultValue={user.name}
                    className="bg-transparent"
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    defaultValue={user.user_name}
                    className="bg-transparent"
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="password"
                    defaultValue="password"
                    className="bg-transparent"
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    defaultValue={user.rol}
                    className="bg-transparent"
                    readOnly
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(user.id)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableUser;
