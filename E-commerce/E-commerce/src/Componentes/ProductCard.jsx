import { useEffect, useState, useContext } from "react";
import FormEdit from "./FormEdit";
import { isFavorito, toggleFavorito } from "../context/Favoritos";
import "../assets/styles/ProductCard.css";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ producto, usuario, onUpdateProducto, extraActions }) {
  // Rol
  const esAdmin = Number(usuario?.perfil_id) === 1;

  // Estados
  const [productoActual, setProductoActual] = useState(producto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fav, setFav] = useState(false);

  // Context carrito
  const { addToCart } = useContext(CartContext);

  // Sync producto
  useEffect(() => setProductoActual(producto), [producto]);

  // Sync favorito
  useEffect(() => setFav(isFavorito(productoActual)), [productoActual]);

  // Favoritos
  const handleToggleFavorito = () => {
    const { isNowFav } = toggleFavorito(productoActual);
    setFav(isNowFav);
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    addToCart({
      id: productoActual.producto_id ?? productoActual.id_producto ?? productoActual.id,
      name: productoActual.nombre,
      image: productoActual.imagenUrl || "/Imagenes/default.png",
      size: "Único",
      color: "Default",
      price: Number(productoActual.precio ?? 0),
      quantity: 1,
    });
  };

  // API: update producto
  const handleSave = async (formData) => {
    try {
      setIsSaving(true);

      const id = productoActual.producto_id ?? productoActual.id_producto ?? productoActual.id;
      const url = `http://localhost:5079/Producto/UpdateProducto?id_producto=${id}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      let json = {};
      try { json = raw ? JSON.parse(raw) : {}; } catch {}

      if (!response.ok || json?.success === false) return alert("No se pudo actualizar");

      const updated = json?.data ?? formData;

      const updatedProduct = {
        ...productoActual,
        ...updated,
        producto_id: id,
        precio: Number(updated?.precio ?? productoActual.precio),
        marca_id: Number(updated?.marca_id ?? productoActual.marca_id),
        genero_id: Number(updated?.genero_id ?? productoActual.genero_id),
        categoria_id: Number(updated?.categoria_id ?? productoActual.categoria_id),
      };

      setProductoActual(updatedProduct);
      onUpdateProducto?.(updatedProduct);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Error al actualizar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="pc-card">
        <div className="pc-imgWrap">
          <img
            src={productoActual.imagenUrl || "/Imagenes/default.png"}
            alt={productoActual.nombre}
            className="pc-img"
          />

          {!esAdmin && (
            <button className={`pc-favBtn ${fav ? "isFav" : ""}`} onClick={handleToggleFavorito}>
              {fav ? "❤️" : "🤍"}
            </button>
          )}
        </div>

        <div className="pc-body">
          <h5 className="pc-title">{productoActual.nombre}</h5>

          <div className="pc-bottom">
            <span className="pc-price">${productoActual.precio}</span>

            {esAdmin ? (
              <button className="pc-btn pc-btnAdmin" onClick={() => setIsModalOpen(true)}>
                Administrar
              </button>
            ) : (
              <button className="pc-btn pc-btnBuy" onClick={handleAddToCart}>
                Comprar
              </button>
            )}
          </div>

          {/* Acciones extra (ej: quitar de favoritos) */}
          {extraActions && <div className="pc-extra">{extraActions}</div>}
        </div>
      </div>

      {esAdmin && (
        <FormEdit
          isOpen={isModalOpen}
          onClose={() => !isSaving && setIsModalOpen(false)}
          initialData={productoActual}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </>
  );
}
