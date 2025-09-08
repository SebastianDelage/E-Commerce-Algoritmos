import Navbar from "../components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Cart from "../pages/Cart.jsx";
import Category from "../pages/Category.jsx"; // si vas a usar categorías dinámicas

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/categoria/:nombre" element={<Category />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
