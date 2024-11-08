import React from "react";
import { ShoppingCart } from "lucide-react";
import LoadingComponent from "./LoadingComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";

const MarketTable = ({
  loadingInventory,
  errorInventory,
  currentItems,
  handleAddToCart,
}) => {
  if (loadingInventory) return <LoadingComponent />;
  if (errorInventory) return <div className="text-red-500">Error: {errorInventory}</div>;

  return (
    <div className="container mx-auto py-10">
      <Table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell className="text-center">
                <img
                  src={`${import.meta.env.VITE_SANCTUM_URL}${item.img_product}`}
                  alt="Imagen del producto"
                  className="w-20 h-20 rounded-lg"
                />
              </TableCell>
              <TableCell className="text-center">{item.product_name}</TableCell>
              <TableCell className="text-center">{`$ ${item.precio_producto}`}</TableCell>
              <TableCell className="text-center">{item.cantidad_stock}</TableCell>
              <TableCell className="text-center">{item.descripcion}</TableCell>
              <TableCell className="text-center">{item.codigo_producto}</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="icon" onClick={() => handleAddToCart(item)} title="Agregar al carrito">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketTable;
