// src/Componentes/ProductCard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormEdit from "./FormEdit";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";


export default function ProductCard({ producto, usuario }) {
  const esAdmin = usuario?.perfil_id === 2;

  const [productoActual, setProductoActual] = useState(producto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addToCart } = useContext(CartContext);


  // por si el padre vuelve a traer productos nuevos
  useEffect(() => {
    setProductoActual(producto);
  }, [producto]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    if (!isSaving) setIsModalOpen(false);
  };

const handleAddToCart = () => {
  addToCart({
    id: productoActual.id ?? productoActual.id_producto,
    name: productoActual.nombre,
    price: productoActual.precio,
    image: productoActual.imagenUrl,
    quantity: 1,
  });


  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${productoActual.nombre} fue agregado al carrito`,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
};


  const handleSave = async (formData) => {
    try {
      setIsSaving(true);

      const id =
        productoActual.id_producto ?? productoActual.id ?? productoActual.producto_id;

      const response = await fetch(
        `http://localhost:5079/Producto/UpdateProducto?id_producto=${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log("STATUS UPDATE:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta de error del back:", errorText);
        alert("Error al actualizar el producto (ver consola)");
        return;
      }

      // si tu back devuelve { success, statusCode, message, data: producto }
      let updated = formData;
      try {
        const json = await response.json();
        console.log("Respuesta JSON del back:", json);
        if (json.data) updated = json.data;
      } catch {
        // si no devuelve json, al menos uso lo editado
      }

      // acá se actualiza lo que se ve en la card
      setProductoActual((prev) => ({
        ...prev,
        ...updated,
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error en fetch UpdateProducto:", err);
      alert("Ocurrió un error al actualizar el producto (ver consola)");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="card h-100 m-2">
        <img
          src={productoActual.imagenUrl}
          className="card-img-top"
          alt={productoActual.nombre}
        />
        <div className="card-body ">
          <h5 className="card-title">{productoActual.nombre}</h5>
          <p className="card-text">${productoActual.precio}</p>

          {esAdmin ? (
          ) : (
            <Link
  <div className="d-flex gap-2">
    <button
      type="button"
      className="btn btn-warning"
      onClick={handleOpenModal}
    >
      Administrar
    </button>

    <button
      type="button"
      className="btn btn-success"
      onClick={handleAddToCart}
    >
      Agregar al carrito
    </button>
  </div>
) : (
  <Link
    to={`/producto/${productoActual.id ?? productoActual.id_producto}`}
    className="btn btn-primary"
  >
    Ver más
  </Link>
)}

        </div>
      </div>

      <FormEdit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={productoActual}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </>
  );
}
