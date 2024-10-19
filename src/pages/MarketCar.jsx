import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import useAuth from "../Hooks/useAuth";

export default function MarketCar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart: initialCart } = location.state || { cart: [] };
  const [cart, setCart] = useState(initialCart);

useAuth();

  const handleRemoveProduct = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleNavigate = () => {
    navigate("/maindashboard/facturacion/generacionfactura", {
      state: { cart, totalAmount },
    });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + parseFloat(item.precio_producto) * item.quantity,
    0
  );
  return (
    <div className="w-full">
      <div className="w-3/4 mx-auto text-gray-900 bg-transparent content-center mt-5">
        <div className="flex justify-between space-y-2">
          <h1 className="ml-20 font-serif text-3xl text-white">
            Chequeo de compras
          </h1>
          <button
            onClick={handleNavigate}
            className="mr-20 text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Finalizar registro
          </button>
        </div>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-2/3 text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-center p-3 px-5">Codigo</th>
              <th className="text-center p-3 px-5">Producto</th>
              <th className="text-center p-3 px-5">Precio</th>
              <th className="text-left p-3 px-5 ">Cantidad</th>
              <th className="text-center p-3 px-5">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-3">
                  El carrito está vacío.
                </td>
              </tr>
            )}
            {cart.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-orange-100 bg-gray-100"
              >
                <td className="p-3 px-5">{item.codigo_producto}</td>
                <td className="p-3 px-5">{item.product_name}</td>
                <td className="p-3 px-5">{item.precio_producto}</td>
                <td className="text-center p-3 px-5 flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    +
                  </button>
                </td>
                <td className="p-3 px-5">
                  {(parseFloat(item.precio_producto) * item.quantity).toFixed(
                    2
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveProduct(item.id)}
                    className="text-sm bg-red-500 mr-5 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    title="Eliminar producto"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="border-t">
              <td colSpan="3" className="text-right p-3">
                Total:
              </td>
              <td className="p-3 px-5">{totalAmount.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
