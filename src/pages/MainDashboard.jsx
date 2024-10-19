import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import rolesPermissions from "../utils/rolesPermissions";
import { getOptionIcon, getOptionLabel } from "../utils/optionsHelpers";

export default function MainDashboard() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("rol");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setUserRole(storedRole);
  }, [navigate]);

  return (
    <div className="p-5 h-90 mb-16 w-3/6 bg-slate-900 text-green-200 rounded-md opacity-60 w-3/8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de control</h1>
      <div className="grid grid-cols-2 gap-4 relative w-90">
        {Object.keys(rolesPermissions).includes(userRole) ? (
          rolesPermissions[userRole].map((option) => (
            <Link
              to={`/maindashboard/${option}`}
              key={option}
              className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
              onClick={(event) => {
                if (!rolesPermissions[userRole].includes(option)) {
                  event.preventDefault();
                  toast.error("No tienes los permisos suficientes");
                }
              }}
            >
              {getOptionIcon(option)} {getOptionLabel(option)}{" "}
            </Link>
          ))
        ) : (
          <p>
            No se ha encontrado un rol de usuario. Por favor, inicie sesión.
          </p>
        )}
      </div>
    </div>
  );
}
