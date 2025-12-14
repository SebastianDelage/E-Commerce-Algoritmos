// src/Componentes/ProductCard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormEdit from "./FormEdit";

export default function ProductCard({ producto, usuario, onUpdateProducto }) {
  // ✅ Admin solo si existe usuario y perfil_id === 2
  const esAdmin = Number(usuario?.perfil_id) === 1;

  const [productoActual, setProductoActual] = useState(producto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProductoActual(producto);
  }, [producto]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    if (!isSaving) setIsModalOpen(false);
  };

  const handleSave = async (formData) => {
    try {
      setIsSaving(true);

      const id =
        productoActual.producto_id ??
        productoActual.id_producto ??
        productoActual.id;

      const response = await fetch(
        `http://localhost:5079/Producto/UpdateProducto?producto_id=${id}`,
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

      let updated = formData;
      try {
        const json = await response.json();
        console.log("Respuesta JSON del back:", json);
        if (json?.data) updated = json.data;
      } catch {}

      const updatedProduct = {
        ...productoActual,
        ...updated,

        // 🔒 conserva imagen si no vino en la respuesta/payload
        imagenUrl: updated?.imagenUrl ?? productoActual.imagenUrl,

        producto_id: id,
        genero_id: Number(updated?.genero_id ?? productoActual.genero_id),
        marca_id: Number(updated?.marca_id ?? productoActual.marca_id),
        categoria_id: Number(updated?.categoria_id ?? productoActual.categoria_id),
        precio: Number(updated?.precio ?? productoActual.precio),
      };

      setProductoActual(updatedProduct);

      if (typeof onUpdateProducto === "function") {
        onUpdateProducto(updatedProduct);
      }

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
          src={productoActual.imagenUrl || "/Imagenes/default.png"}
          className="card-img-top"
          alt={productoActual.nombre}
        />

        <div className="card-body">
          <h5 className="card-title">{productoActual.nombre}</h5>
          <p className="card-text">${productoActual.precio}</p>

          {esAdmin ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleOpenModal}
            >
              Administrar
            </button>
          ) : (
            <Link
              to={`/producto/${productoActual.producto_id}`}
              className="btn btn-primary"
            >
              Ver más
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Solo renderizamos el modal si es admin */}
      {esAdmin && (
        <FormEdit
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={productoActual}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </>
  );
}

