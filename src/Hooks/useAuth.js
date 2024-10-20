import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_URL_BASE;

  useEffect(() => {
    if (token) {
      // Verificar la validez del token con el servidor
      axios
        .get(`${apiUrl}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Si el token es válido, puedes continuar o manejar la respuesta
        })
        .catch((error) => {
          // Si hay un error (ej. token no válido), redirigir a login
          console.error("Authentication error", error);
          navigate("/login");
        });
    } else {
      // Si no hay token, redirigir a login
      console.error("No token found");
      navigate("/login");
    }
  }, [navigate, token]);
};

export default useAuth;
