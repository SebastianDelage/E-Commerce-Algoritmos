import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Componentes/Header.jsx";
import Favoritos from "../Vistas/Favoritos";
import { CartProvider } from "../context/CartContext";

import Home from "./Home.jsx";
import Hombres from "./Hombres.jsx";
import Mujeres from "./Mujeres.jsx";
import Promociones from "./Promociones.jsx";

function App() {
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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
