import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../assets/styles/Header.css";
import CartSlide from "../Componentes/CartSlide";
import LoginModal from "../Componentes/LoginModal";

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  //Constantes para redireccion y verificacion de usuario logueado
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay usuario en localStorage
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // true si hay user, false si no
  }, []);

  const handleCartClick = () => {
    console.log("Carrito abierto, showCart:",true);
    setShowCart(true);
  };

  const handleCloseCart = () => {
    console.log("Carrito cerrado, showCart:",false);
    setShowCart(false);
  };

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // Para redirigir si el usuario esta logueado
      navigate("/perfil");
    } else {
      // Muestra el cartel de inicio de sesion
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (user) => {
    // Guarda usuario (hardcodeado por el momento)
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setShowLoginModal(false);
    navigate("/perfil");
  };

  return (
    <div className="container py-2">
      <div className="row align-items-center">
        {/* IZQUIERDA: búsqueda */}
        <div className="col-4 d-flex justify-content-start">
          <i className="bi bi-search fs-4 me-3" />
          {/* <input type="text" placeholder="Buscar..." className="form-control w-50" /> */}
        </div>

        {/* CENTRO: logo */}
        <div className="col-4 text-center">
          <Link to="/">
            <img src={logo} alt="Logo E-Commerce" className="img-fluid logo" />
          </Link>
        </div>

        {/* DERECHA: carrito, favoritos, login */}
        <div className="col-4 d-flex justify-content-end gap-3">
          {/* Botón del carrito */}
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
