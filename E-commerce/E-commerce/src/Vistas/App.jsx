import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Componentes/Header.jsx";
import Favoritos from "../Vistas/Favoritos.jsx";
import Perfil from "../Vistas/Perfil.jsx";
import { CartProvider } from "../context/CartContext";

import Back from "./Back.jsx";
import Home from "./Home.jsx";
import Hombres from "./Hombres.jsx";
import Mujeres from "./Mujeres.jsx";
import Promociones from "./Promociones.jsx";

function App() {
  // Sesión global
  const [user, setUser] = useState(null);

  // Productos globales
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar productos
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5079/Producto/GetAll");
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setProductos(data.data.map((p) => ({ ...p, genero_id: Number(p.genero_id) })));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    };

    getData();
  }, []);

  // Actualizar producto en el array global
  const onUpdateProducto = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.producto_id === productoActualizado.producto_id ? productoActualizado : p))
    );
  };

  // Validación admin (mantener consistente con Header/ProductCard)
  const isAdmin = Number(user?.perfil_id) === 1;

  return (
    <CartProvider>
      <Router>
        <Header user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home productos={productos} cargando={cargando} user={user} onUpdateProducto={onUpdateProducto} />} />
          <Route path="/hombres" element={<Hombres productos={productos} cargando={cargando} user={user} onUpdateProducto={onUpdateProducto} />} />
          <Route path="/mujeres" element={<Mujeres productos={productos} cargando={cargando} user={user} onUpdateProducto={onUpdateProducto} />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/favoritos" element={<Favoritos usuario={user} />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/back" element={isAdmin ? <Back /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
