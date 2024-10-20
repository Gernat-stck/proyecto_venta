import React from "react";
import useAuth from "../Hooks/useAuth";
import MainGraph from "../components/MainGraph";
//Realizar la logica para traer la informacion necesaria de la api para mandarla formateada a las graficas

export default function SalesRecord() {
useAuth();
  return <MainGraph />;
}
