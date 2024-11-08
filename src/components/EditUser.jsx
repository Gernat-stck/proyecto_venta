import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import useAuth from "./../Hooks/useAuth";
import { User } from "lucide-react";
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

export default function EditUser() {
  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    password: "",
    rol: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const { fetchData, error, response } = useAxios({});
  useAuth();
  
  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      await fetchData({
        url: `/users/${userId}`,
        method: "put",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response);
      if (!error) {
        navigate("/maindashboard/usuarios", {
          state: { successMessage: "Usuario actualizado con éxito" },
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rol: value,
    }));
  };

  const handleCancel = () => {
    navigate("/maindashboard/usuarios", { state: { successMessage: null } });
  };

  if (error) {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="bg-transparent flex items-center justify-center w-screen h-screen">
      <ToastContainer />
      <Card className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <User className="w-6 h-6 text-gray-600" />
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold">Actualizar usuario</CardTitle>
          <CardDescription className="text-gray-600 mb-6">Ingresa los detalles del registro.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirmUser}>
            <div className="mb-4">
              <Label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">Nombre Completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="James Brown"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="user_name" className="block text-sm font-semibold mb-2 text-gray-700">Usuario *</Label>
              <Input
                id="user_name"
                name="user_name"
                type="text"
                required
                placeholder="Usuario"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">Contraseña *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="rol" className="block text-sm font-semibold mb-2 text-gray-700">Rol *</Label>
              <select
                id="rol"
                name="rol"
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                onChange={handleSelectChange}
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="Operador de Producción">Operador de Producción</option>
                <option value="Supervisor de Inventario">Supervisor de Inventario</option>
                <option value="Operador de caja">Operador de caja</option>
              </select>
            </div>
            <div className="flex justify-between">
              <Button
                type="submit"
                className="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Actualizar
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
    </div>
  );
}
