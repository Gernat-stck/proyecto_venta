import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useGetRequest from "../Hooks/useGetRequest";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import Pagination from "../components/Pagination";
import InventoryTable from "./../components/InventoryTable";
import SearchBar from "../components/SearchBar";
import useAuth from "../Hooks/useAuth";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const location = useLocation();
  const { successMessage } = location.state || {};
  useAuth();
  const {
    data,
    loading: loadingProducts,
    error: errorProducts,
  } = useGetRequest(
    isSearching ? `inventario/search?termino=${searchTerm}` : `inventario`
  );
  const {
    deleteData,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteRequest();


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

  const handleEdit = (itemId) => {
    navigate(`/maindashboard/inventario/editar-producto`, {
      state: { itemId },
    });
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteData(`inventario/${itemId}`);
      toast.success("Usuario eliminado con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProducts(products.filter((item) => item.id !== itemId));
    } catch (error) {
      toast.error(
        { error },
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

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
  if (!loadingDelete && errorDelete) {
    toast.error("Error al Eliminar el usuario, intentelo de nuevo", {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />
      <div className="text-gray-900 bg-transparent content-center mt-7">
        <div className="flex justify-between space-y-2">
          <h1 className="text-3xl text-white">Inventario</h1>
          <button
            onClick={() => navigate("/maindashboard/inventario/create-product")}
            className="text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Nuevo Item
          </button>
        </div>
        <InventoryTable
          loadingInventory={loadingProducts}
          errorInventory={errorProducts}
          currentItems={currentItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
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
