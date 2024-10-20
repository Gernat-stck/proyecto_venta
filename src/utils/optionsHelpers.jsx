// optionHelpers.js

import React from "react";
import {
    UsersIcon,
    BuildingStorefrontIcon,
    BriefcaseIcon,
    ShoppingCartIcon,
    ClipboardDocumentListIcon
  } from "@heroicons/react/24/outline";

// Función para obtener el ícono correspondiente a la opción
export const getOptionIcon = (option) => {
  switch (option) {
    case "usuarios":
      return <UsersIcon className="h-10 w-10 mb-2" />;
    case "inventario":
      return <BuildingStorefrontIcon className="h-10 w-10 mb-2" />;
    case "facturacion":
      return <BriefcaseIcon className="h-10 w-10 mb-2" />;
    case "marketcar":
      return <ShoppingCartIcon className="h-10 w-10 mb-2" />;
    case "registro-ventas":
      return <ClipboardDocumentListIcon className="h-10 w-10 mb-2" />;
    default:
      return null;
  }
};

// Función para obtener la etiqueta correspondiente a la opción
export const getOptionLabel = (option) => {
  switch (option) {
    case "usuarios":
      return "Usuarios";
    case "inventario":
      return "Inventario";
    case "facturacion":
      return "Facturación";
    case "clientes":
      return "Clientes";
    case "precios":
      return "Precios";
    case "registro-ventas":
      return "Registro Ventas";
    default:
      return null;
  }
};