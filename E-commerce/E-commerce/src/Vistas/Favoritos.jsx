import React, { useEffect, useState } from "react";
import ProductCard from "../Componentes/ProductCard";
import { getFavoritos, removeFavoritoById, getProductoId } from "../context/Favoritos";
import "../assets/styles/Favoritos.css";

const Favoritos = ({ usuario }) => {
  // Estado lista
  const [favoritos, setFavoritos] = useState([]);

  // ← SOLO UNA definición de handleRemove
  const handleRemove = (id) => {
    const newFavs = removeFavoritoById(id);
    setFavoritos(newFavs);
    showNotification("Eliminado de favoritos", "remove");
  };

  // Carga desde storage
  const cargar = () => setFavoritos(getFavoritos());

  // Listener para cambios (storage + custom event)
  useEffect(() => {
    cargar(); // carga inicial

    const handleStorage = (e) => {
      if (e.key === "favoritos") {
        cargar();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("favoritesChanged", cargar);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("favoritesChanged", cargar);
    };
  }, []); // ← dependencias vacías → se ejecuta solo al montar/desmontar

  return (
    <div className="container mt-4">
      <h2>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>Aquí aparecerán tus productos favoritos.</p>
      ) : (
        <div className="row">
          {favoritos.map((p) => {
            const id = getProductoId(p);

            return (
              <div className="col-12 col-md-4 mb-3" key={id}>
                <ProductCard
                  producto={p}
                  usuario={usuario ?? { perfil_id: 0 }}
                  extraActions={
                    <button
                      className="pc-btnDanger"
                      onClick={() => handleRemove(id)}
                    >
                      Quitar de favoritos
                    </button>
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favoritos;