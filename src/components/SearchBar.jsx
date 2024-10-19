import { HomeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const buscar = () => {
    onSearch(terminoBusqueda);
  };

  const regresar = () => {
    setTerminoBusqueda("");
    onSearch("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex border-2 border-gray-200 rounded">
        <button
          className="px-4 text-white bg-gray-600 border-l"
          onClick={regresar}
          title="Regresar"
        >
          <HomeIcon className="w-6 h-6" />
        </button>
        <input
          type="text"
          className="px-4 py-2 w-80"
          placeholder="Busca por nombre o palabras clave en la descripción"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button
          className="px-4 text-white bg-gray-600 border-l"
          onClick={buscar}
        >
          Search
        </button>
      </div>
    </div>
  );
}
