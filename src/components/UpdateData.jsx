import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../Hooks/useAxios";

export default function UpdateData({ cart, createRecord, invoiceBlob }) {
  const [updatedCart, setUpdatedCart] = useState(cart);
  const { fetchData } = useAxios({});

  useEffect(() => {
    if (cart) {
      const newCart = cart.map((item) => ({
        ...item,
        stock: item.stock - item.quantity,
      }));
      setUpdatedCart(newCart);
    }
  }, [cart]);

  const updateStock = () => {
    updatedCart.forEach((item) => {
      let newStock = item.cantidad_stock - item.quantity;
      if (newStock != null) {
        fetchData({
          url: `inventario-stock/${item.id}`,
          method: "put",
          data: {
            cantidad_stock: newStock,
          },
        });
      }
    });
    toast.success("Carrito actualizado con éxito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSaveInvoice = async () => {
    const formData = new FormData();
    formData.append("nombre_cliente", createRecord.nombre_cliente);
    formData.append("direccion", createRecord.direccion);
    formData.append("numero_telefono", createRecord.numero_telefono);
    formData.append("email", createRecord.email);
    formData.append("documento", createRecord.documento);
    formData.append("total", createRecord.total);
    formData.append("iva", createRecord.total * 0.13);
    formData.append("subtotal", createRecord.total - createRecord.total * 0.13);
    formData.append("giro", createRecord.giro);
    formData.append("registro_num", createRecord.registro_num);
    formData.append(
      "factura",
      invoiceBlob,
      `${createRecord.nombre_cliente}.pdf`
    );
    try {
      const response = await fetchData({
        url: "invoices",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        toast.success("Factura guardada con إexito", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Respuesta inválida:", response, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  useEffect(() => {
    updateStock();
    handleSaveInvoice();
  }, []);

  return <ToastContainer />;
}
