import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Login() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const urlSanctum = import.meta.env.VITE_SANCTUM_URL;
  const urlBase = import.meta.env.VITE_URL_BASE;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
    <Card className="max-w-[400px] mx-auto p-4 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Bienvenido</CardTitle>
        <CardDescription className="text-center">
          Inicia Sesión para continuar tu experiencia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-[11px] h-4 w-4 text-gray-500" />
              <Input
                id="username"
                placeholder="Usuario"
                type="text"
                className="pl-9"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-[11px] h-4 w-4 text-gray-500" />
              <Input
                id="password"
                placeholder="Contraseña"
                type={isPasswordVisible ? "text" : "password"}
                className="pl-9"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[11px] h-4 w-4 text-gray-500 hover:text-gray-900"
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
