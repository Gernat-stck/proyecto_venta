import React from "react";
import logo from "../img/partsfrio.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found", token);
      navigate("/login");
      return;
    }

    const response = await fetch("https://coldparts.online/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div className="p-2 text-gray-900 bg-white rounded-lg shadow-lg font-medium capitalize">
      <button onClick={() => navigate("/maindashboard")}>
        <span className="px-2 mr-2 border-r border-gray-800">
          <img
            src={logo}
            alt="parts frio"
            className="w-15 h-11 -mt-1 inline mx-auto"
          />
        </span>
      </button>
      <button className="float-right" title="logout" onClick={handleLogout} disabled={location.pathname === "/login"}>
        <ArrowLeftStartOnRectangleIcon className="h-7 w-7" />
      </button>
    </div>
  );
}
