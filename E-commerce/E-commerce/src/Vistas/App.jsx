import Navbar from "../components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Cart from "../pages/Cart.jsx";
import CartSlide from "../Componentes/CartSlide.jsx";
import Category from "../pages/Category.jsx";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onCartClick={() => setShowCart(true)} />

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
