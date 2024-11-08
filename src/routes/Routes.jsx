import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./../components/Header";
import Login from "../pages/Login";
import MainDashboard from "./../pages/MainDashboard";
import Users from "./../pages/Users";
import Inventory from "./../pages/Inventory";
import SalesRecord from "./../pages/SalesRecord";
import Invoices from "./../pages/Invoices";
import MarketCar from "../pages/MarketCar";
import CollectInfoConsumer from "../pages/CollectInfoConsumer";
import CreateNewProduct from "../components/CreateNewProduct";
import CreateNewUser from "../components/CreateNewUser";
import EditUser from "../components/EditUser";
import NotFound from "../pages/NotFound";
import EditProduct from "../components/EditProduct";

function ProtectedComponent({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
}

ProtectedComponent.propTypes = {
  children: PropTypes.node,
};

function RoutesComp() {
  return (
    <Router className="flex flex-col overflow-x-hidden overflow-auto">
      <header className="bg-white">
        <Header />
      </header>
      <div className="flex items-center justify-center min-h-screen bg-slate-700 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} exactpath />
          <Route
            path="/maindashboard"
            element={
              <ProtectedComponent>
                <MainDashboard />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/usuarios"
            element={
              <ProtectedComponent>
                <Users />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/inventario"
            element={
              <ProtectedComponent>
                <Inventory />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/registro-ventas"
            element={
              <ProtectedComponent>
                <SalesRecord />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/facturacion"
            element={
              <ProtectedComponent>
                <Invoices />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/marketcar"
            element={
              <ProtectedComponent>
                <MarketCar />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/facturacion/generacionfactura"
            element={
              <ProtectedComponent>
                <CollectInfoConsumer />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/inventario/create-product"
            element={
              <ProtectedComponent>
                <CreateNewProduct />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/usuarios/createuser"
            element={
              <ProtectedComponent>
                <CreateNewUser />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/usuarios/editarusuario"
            element={
              <ProtectedComponent>
                <EditUser />
              </ProtectedComponent>
            }
          />
          <Route
            path="/maindashboard/inventario/editar-producto"
            element={
              <ProtectedComponent>
                <EditProduct />
              </ProtectedComponent>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutesComp;
