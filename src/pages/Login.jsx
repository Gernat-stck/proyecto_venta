import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
export default function Login() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const urlSanctum = import.meta.env.VITE_SANCTUM_URL;
  const urlBase = import.meta.env.VITE_URL_BASE;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizamos la solicitud para obtener el token CSRF
      await axios.get(`${urlSanctum}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      // Realizamos la solicitud de inicio de sesión
      const response = await axios.post(
        `${urlBase}/login`,
        {
          user_name: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        toast.error("Error en la autenticación", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", username);
      localStorage.setItem("userIdLogged", data.user.id);
      localStorage.setItem("rol", data.user.rol);

      navigate("/maindashboard");
    } catch (error) {
      // Mostramos un mensaje de error al usuario
      toast.error("Revisa las credenciales", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="bg-gray-100 rounded-lg py-10 px-4 lg:px-24">
      <ToastContainer />
      <p className="text-center text-sm bold text-gray-700 font-strong">
        Inicia Sesion para continuar
      </p>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
            id="username"
            type="text"
            required
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 ml-3 text-gray-400 p-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
        <div className="relative mt-3">
          <input
            className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
            id="password"
            required
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 ml-3 text-gray-400 p-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
          </div>
          <div className="absolute right-0 inset-y-0 flex items-center">
            <button type="button" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-7 w-7 mr-3 text-gray-400 p-1" />
              ) : (
                <EyeIcon className="h-7 w-7 mr-3 text-gray-400 p-1" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" type="submit" onClick={handleSubmit}>
            Iniciar Sesion
          </button>
        </div>
      </form>
    </div>
  );
}