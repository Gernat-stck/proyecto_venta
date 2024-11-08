import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { User } from "lucide-react";

export default function InfoClientComp({
  handleSubmit,
  handleChange,
  handleCancel,
}) {
  return (
    <Card className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full">
      <CardHeader className="text-center mb-4 ">
      <div className="flex justify-center mb-4">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <User className="w-6 h-6 text-gray-600" />
            </span>
          </div>
        <CardTitle className="text-2xl font-semibold">
          Ingrese Datos Cliente
        </CardTitle>
        <CardDescription className="text-gray-600">
          Ingresa los detalles del cliente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Nombre",
                name: "nombre",
                type: "text",
                placeholder: "Ingrese el nombre",
              },
              {
                label: "Apellido",
                name: "apellido",
                type: "text",
                placeholder: "Ingrese el apellido",
              },
              {
                label: "Teléfono",
                name: "telefono",
                type: "text",
                placeholder: "Teléfono",
                maxLength: 8,
              },
              {
                label: "DUI",
                name: "documento",
                type: "text",
                placeholder: "Ingrese DUI",
                maxLength: 9,
              },
              {
                label: "Dirección",
                name: "direccion",
                type: "text",
                placeholder: "Calle, colonia, ciudad",
              },
              {
                label: "Municipio",
                name: "municipio",
                type: "text",
                placeholder: "Municipio",
              },
              {
                label: "Departamento",
                name: "departamento",
                type: "text",
                placeholder: "Departamento",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Email",
              },
              {
                label: "Giro",
                name: "giro",
                type: "text",
                placeholder: "Giro",
              },
              {
                label: "Número de Registro",
                name: "registro_num",
                type: "text",
                placeholder: "Registro",
              },
            ].map((field, index) => (
              <div key={index} className="mb-4">
                <Label
                  htmlFor={field.name}
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  {field.label} *
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full"
                  onChange={handleChange}
                  maxLength={field.maxLength}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              type="submit"
              className="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Continuar
            </Button>
            <Button
              onClick={handleCancel}
              type="button"
              className="w-full mb-3 ml-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
