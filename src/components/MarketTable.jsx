import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LoadingComponent from "./LoadingComponent";

const MarketTable = ({
  loadingInventory,
  errorInventory,
  currentItems,
  handleAddToCart
}) => {
  return (
    <div className="flex flex-col justify-center h-full space-y-4 py-5">
      {loadingInventory && <LoadingComponent />}
      {!loadingInventory &&
        !errorInventory &&
        currentItems.map((item) => (
          <div
            className="relative flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-2xl mx-5 border border-white bg-white"
            key={item.id}
          >
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <img
                src={`https://coldparts.online${item.img_product}`}
                alt="tailwind logo"
                className="rounded-xl"
              />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center">
                <p className="text-gray-500 font-medium hidden md:block">
                  {`codigo: ${item.codigo_producto}`}
                </p>
                <p className="text-l font-black text-gray-800">
                  {`$  ${item.precio_producto}`}
                </p>
                <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                  Stock:
                  {item.cantidad_stock}
                </div>
              </div>
              <h3 className="font-black text-gray-800 md:text-xl text-xl">
                {item.product_name}
              </h3>
              <p className="md:text-md text-gray-500 text-base">
                {item.descripcion}
              </p>
              <div className="flex justify-center">
                <div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-sm text-green-500 rounded focus:outline-none focus:shadow-outline mr-5"
                    title="Agregar al carrito de compras"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MarketTable;
