// src/Paginas/Home.jsx
import { useState, useEffect } from 'react';
import "../assets/styles/Home.css";
import ProductCard from "../Componentes/ProductCard";
import Cartel from "../Componentes/Cartel";


export default function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState({perfil_id:1});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5079/Producto/GetAll", {
          method: "GET",
          mode: "cors"
        });
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setProductos(data.data);
        } else {
          console.warn("La respuesta no contiene un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Cartel></Cartel>
      </div>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.producto_id}>
              <ProductCard producto={producto} usuario={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
