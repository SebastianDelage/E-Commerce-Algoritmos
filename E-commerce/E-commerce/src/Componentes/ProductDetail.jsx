import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Simulación de productos (puede reemplazarse por fetch a tu BDD/API)
const productos = [
  {
    id: 1,
    name: "Auriculares Pro",
    price: 12000,
    image: "/assets/auriculares.jpg",
    description: "Auriculares con cancelación de ruido, ideales para entornos corporativos y videollamadas.",
    brand: "SoundCore",
    stock: 15
  },
  {
    id: 2,
    name: "Zapatillas Urbanas",
    price: 18000,
    image: "/assets/zapatillas.jpg",
    description: "Diseño moderno y cómodo para jornadas laborales o eventos institucionales.",
    brand: "UrbanStep",
    stock: 8
  },
  {
    id: 3,
    name: "Lámpara LED",
    price: 9500,
    image: "/assets/lampara.jpg",
    description: "Iluminación eficiente con estética minimalista, ideal para oficinas y espacios creativos.",
    brand: "LumenX",
    stock: 22
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const encontrado = productos.find(p => p.id === parseInt(id));
    setProducto(encontrado);
  }, [id]);

  if (!producto) {
    return (
      <div className="text-center mt-5">
        <h4>Producto no encontrado</h4>
      </div>
    );
  }

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <img
          src={producto.image}
          alt={producto.name}
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h2>{producto.name}</h2>
        <p className="text-muted">{producto.description}</p>
        <p><strong>Marca:</strong> {producto.brand}</p>
        <p><strong>Stock disponible:</strong> {producto.stock}</p>
        <h4 className="text-success">${producto.price}</h4>
        <button className="btn btn-primary mt-3">Agregar al carrito</button>
      </div>
    </div>
  );
}
/*
// src/Componentes/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Ejemplo de fetch simulado
    fetch("/data/productos.json")  // tu archivo JSON o endpoint
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((p) => p.id === parseInt(id));
        setProducto(encontrado);
      })
      .catch(() => setProducto(null));
  }, [id]);

  if (!producto) {
    return (
      <div className="text-center mt-5">
        <h4>Producto no encontrado 😕</h4>
        <Link to="/" className="btn btn-secondary mt-3">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h2>{producto.nombre}</h2>
        <p className="text-muted">{producto.descripcion}</p>
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Stock disponible:</strong> {producto.stock}</p>
        <h4 className="text-success">${producto.precio}</h4>
        <button className="btn btn-primary mt-3">Agregar al carrito</button>
      </div>
    </div>
  );
}
*/