import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User } from "lucide-react";

export default function CreateNewUser() {
  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    password: "",
    rol: "",
  });
  const navigate = useNavigate();
  const { fetchData, error } = useAxios({});

  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      await fetchData({
        url: "/users",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      navigate("/maindashboard/usuarios", {
        state: { successMessage: "Usuario creado con éxito" },
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = async (e) => {
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
    <div className=" flex items-center justify-center min-h-screen">
      <ToastContainer />
      <Card className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <User className="w-6 h-6 text-gray-600" />
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">
            Crear un nuevo usuario
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Ingresa los detalles del registro.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirmUser} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nombre Completo *
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="James Brown"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Usuario *
              </label>
              <Input
                type="username"
                id="username"
                name="user_name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Usuario"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña *
              </label>
              <Input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="••••••••"
                name="password"
                minLength="8"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Rol *
              </label>
              <select
                name="selectedRol"
                className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                onChange={handleSelectChange}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="Operador de Produccion">
                  Operador de Produccion
                </option>
                <option value="Supervisor de Inventario">
                  Supervisor de Inventario
                </option>
                <option value="Operador de caja">Operador de caja</option>
              </select>
            </div>
            <div className="flex justify-between">
              <Button
                type="submit"
                className="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Registrar
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
