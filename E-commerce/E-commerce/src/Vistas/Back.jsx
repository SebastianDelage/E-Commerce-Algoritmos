import React from "react";

/*
  Componente para crear productos
*/
import CreateProducto from "../Componentes/FormAgregar";

const Back = () => {
  /*
    Callback opcional:
    - se ejecuta cuando el producto se crea correctamente
    - más adelante podés usarlo para actualizar un listado, mostrar toast, etc.
  */
  const handleProductoCreado = (producto) => {
    console.log("Producto creado desde Back:", producto);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Panel de Administración</h2>

      <p className="text-muted mb-4">
        Desde aquí podés cargar productos y gestionar el catálogo.
      </p>

      {/* Formulario de alta de producto */}
      <CreateProducto onCreated={handleProductoCreado} />
    </div>
  );
};

export default Back;
