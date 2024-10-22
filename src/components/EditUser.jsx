import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import useAuth from "./../Hooks/useAuth";
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
    <div className="bg-transparent flex items-center justify-center w-screen h-screen">
      <ToastContainer />
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Actualizar usuario
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ingresa los detalles del registro.
        </p>
        <form onSubmit={handleConfirmUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="James Brown"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Usuario *
            </label>
            <input
              type="username"
              id="username"
              name="user_name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Usuario"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              onChange={handleChange}
            >
              Rol *
            </label>
            <select
              name="selectedRol"
              className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              onChange={handleSelectChange}
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
            <button
              type="submit"
              className="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Actualizar
            </button>
            <button
              onClick={handleCancel}
              type="back"
              className="w-full mb-3 ml-5    bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
