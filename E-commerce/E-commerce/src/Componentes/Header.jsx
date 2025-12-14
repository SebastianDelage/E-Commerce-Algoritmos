import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../public/Imagenes/Logo/logo.png";
import "../assets/styles/Header.css";
import CartSlide from "../Componentes/CartSlide";
import LoginModal from "../Componentes/LoginModal";

const Header = ({ user, setUser }) => {
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const isAdmin = Number(user?.perfil_id) === 2;

  const handleCartClick = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const handleProfileClick = () => {
    if (user) {
      navigate("/perfil");
    } else {
      setShowLoginModal(true);
    }
  };

  // 🔥 ESTA FUNCIÓN ES LA CLAVE
  const handleLoginSuccess = (loggedUser) => {
    console.log("LOGIN OK:", loggedUser);

    // ✅ seteamos el user global (App)
    setUser(loggedUser);

    // ✅ cerramos el modal
    setShowLoginModal(false);

    // ❌ NO guardamos en localStorage (sesión no persistente)
    // localStorage.setItem("user", JSON.stringify(loggedUser));

    // opcional: volver al home
    navigate("/");
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="container py-2">
      <div className="row align-items-center">
        {/* IZQUIERDA: búsqueda */}
        <div className="col-4 d-flex align-items-center position-relative">
          <i
            className="bi bi-search fs-4 me-3 buscar cursor-pointer"
            onClick={handleSearchClick}
          />
          <input
            type="text"
            placeholder="Buscar..."
            className={`form-control search-input ${
              showSearch ? "expand" : ""
            }`}
          />
        </div>

        {/* CENTRO: logo */}
        <div className="col-4 text-center">
          <Link to="/">
            <img src={logo} alt="Logo E-Commerce" className="img-fluid logo" />
          </Link>
        </div>

        {/* DERECHA */}
        <div className="col-4 d-flex justify-content-end gap-3">
          {/* ADMIN */}
          {isAdmin && (
            <button
              className="btn btn-link p-0"
              onClick={() => navigate("/back")}
            >
              <i className="admin bi bi-tools fs-4" title="Panel Admin" />
            </button>
          )}

          {/* Carrito */}
          <button className="btn btn-link p-0" onClick={handleCartClick}>
            <i className="carrito bi bi-cart fs-4" />
          </button>

          {/* Favoritos */}
          <Link to="/favoritos">
            <i className="favorito bi bi-heart fs-4" />
          </Link>

          {/* Perfil / Login */}
          <button className="btn btn-link p-0" onClick={handleProfileClick}>
            <i className="perfil bi bi-person-circle fs-4" />
          </button>
        </div>
      </div>

      {/* Menú inferior */}
      <div className="row mt-2">
        <div className="col d-flex justify-content-around menu">
          <Link to="/hombres">Hombres</Link>
          <Link to="/mujeres">Mujeres</Link>
          <Link to="/promociones">Promociones</Link>
        </div>
      </div>

      {/* Sidebar del carrito */}
      <CartSlide show={showCart} onClose={handleCloseCart} />

      {/* Modal de login */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Header;
