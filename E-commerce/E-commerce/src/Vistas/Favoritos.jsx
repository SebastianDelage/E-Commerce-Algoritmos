import React, { useEffect, useState } from "react";
import ProductCard from "../Componentes/ProductCard";
import { getFavoritos, removeFavoritoById, getProductoId } from "../context/Favoritos";

const Favoritos = ({ usuario }) => {
  // Estado lista
  const [favoritos, setFavoritos] = useState([]);

  // Carga desde storage
  const cargar = () => setFavoritos(getFavoritos());

  // Listener storage
  useEffect(() => {
    cargar();
    const onStorage = (e) => e.key === "favoritos" && cargar();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Quitar favorito
  const handleRemove = (id) => {
    const newFavs = removeFavoritoById(id);
    setFavoritos(newFavs);
  };

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
                    <button className="pc-btnDanger" onClick={() => handleRemove(id)}>
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
