import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useGetRequest from "../Hooks/useGetRequest";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import MarketTable from "../components/MarketTable";
import useAuth from "../Hooks/useAuth";
import { Button } from "../components/ui/button";

export default function Invoices() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const location = useLocation();
  const { successMessage } = location.state || {};
  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = useGetRequest(
    isSearching ? `inventario/search?termino=${searchTerm}` : `inventario`
  );
useAuth();

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [successMessage]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (!loadingProducts && errorProducts) {
    toast.error("Error al cargar usuarios, intentelo de nuevo", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleSearch = (term) => {
    setIsSearching(true);
    setSearchTerm(term);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      const precioConIva = product.precio_producto * 0.13; // Calcula el IVA

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1, iva: precioConIva }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, iva: precioConIva }];
      }
    });
    toast.success(`${product.product_name} agregado al carrito`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleNavigate = () => {
    if (cart && cart.length > 0) {
      navigate("/maindashboard/marketcar", { state: { cart } });
    } else {
      toast.warn("El carrito está vacío", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto bg-transparent mt-10">
        <div className="px-10 flex justify-between">
          <h1 className="text-3xl text-white">Sección de compras</h1>
          <Button
            onClick={handleNavigate}
            className="text-sm mr-3 bg-lime-700 hover:bg-lime-800 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Ver Carrito
          </Button>
        </div>
        <MarketTable
          loadingInventory={loadingProducts}
          errorInventory={errorProducts}
          currentItems={currentItems}
          handleAddToCart={handleAddToCart}
        />
        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}
