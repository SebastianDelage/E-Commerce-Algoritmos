import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importaciones de UI
import logo from "../../public/Imagenes/Logo/logo.png";
import "../assets/styles/Header.css";

// Componentes que abre el header
import CartSlide from "../Componentes/CartSlide";
import LoginModal from "../Componentes/LoginModal";

const Header = ({ user, setUser }) => {
  // Estados UI
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Navegación
  const navigate = useNavigate();

  // Rol
  const isAdmin = Number(user?.perfil_id) === 1;

  // Acciones UI
  const handleCartClick = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Validación acceso perfil
  const handleProfileClick = () => {
    if (user) navigate("/perfil");
    else setShowLoginModal(true);
  };

  // Login exitoso: guardar sesión en memoria (App)
  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
    setShowLoginModal(false);
    navigate("/");
  };

  // Búsqueda UI
  const handleSearchClick = () => setShowSearch(!showSearch);

  return (
    <div className="container py-2">
      <div className="row align-items-center">
        {/* Buscador */}
        <div className="col-4 d-flex align-items-center position-relative">
          <i className="bi bi-search fs-4 me-3 buscar cursor-pointer" onClick={handleSearchClick} />
          <input
            type="text"
            placeholder="Buscar..."
            className={`form-control search-input ${showSearch ? "expand" : ""}`}
          />
        </div>

        {/* Logo */}
        <div className="col-4 text-center">
          <Link to="/">
            <img src={logo} alt="Logo E-Commerce" className="img-fluid logo" />
          </Link>
        </div>

        {/* Iconos */}
        <div className="col-4 d-flex justify-content-end gap-3">
          {isAdmin && (
            <button className="btn btn-link p-0" onClick={() => navigate("/back")}>
              <i className="admin bi bi-tools fs-4" title="Panel Admin" />
            </button>
          )}

          <button className="btn btn-link p-0" onClick={handleCartClick}>
            <i className="carrito bi bi-cart fs-4" />
          </button>

          <Link to="/favoritos">
            <i className="favorito bi bi-heart fs-4" />
          </Link>

          <button className="btn btn-link p-0" onClick={handleProfileClick}>
            <i className="perfil bi bi-person-circle fs-4" />
          </button>
        </div>
      </div>

      {/* Menú */}
      <div className="row mt-2">
        <div className="col d-flex justify-content-around menu">
          <Link to="/hombres">Hombres</Link>
          <Link to="/mujeres">Mujeres</Link>
          <Link to="/promociones">Promociones</Link>
        </div>
      </div>

      {/* Carrito */}
      <CartSlide show={showCart} onClose={handleCloseCart} usuario={user} />

      {/* Login */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Header;
