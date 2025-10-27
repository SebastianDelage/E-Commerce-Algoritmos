import "../assets/styles/ProductItem.css";
import { useState, useEffect } from 'react';
import ProductCard from "../Componentes/ProductCard";
import Cartel from "../Componentes/Cartel";

export default function Hombres() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5079/Producto/GetProductoByGenero?genero_id=1", {
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


    useEffect(() => {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };


      return (
        <div className="container">
          <div className="row">
          </div>
    
          {cargando ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="row">
              {productos.map((producto) => (
                <div className="col-md-4 mb-3" key={producto.producto_id}>
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          )} {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Volver al inicio"
            >
              <i className="bi bi-arrow-up-circle-fill fs-3"></i>
            </button>
          )}
        </div>
      );
  }
  