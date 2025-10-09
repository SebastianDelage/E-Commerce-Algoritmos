import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <CartProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hombres" element={<Hombres />} />
            <Route path="/mujeres" element={<Mujeres />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/back" element={user?.role === "admin" ? <Back /> : <Navigate to="/" />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
