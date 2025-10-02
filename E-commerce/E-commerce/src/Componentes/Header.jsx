import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../assets/styles/Header.css";
import CartSlide from "../Componentes/CartSlide";

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    console.log("Carrito abierto, showCart:",true);
    setShowCart(true);
  };

  const handleCloseCart = () => {
    console.log("Carrito cerrado, showCart:",false);
    setShowCart(false);
  };

  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };


  return (
    <div className="container py-2">
      <div className="row align-items-center">
        {/* IZQUIERDA: búsqueda */}

        <div className="col-4 d-flex align-items-center position-relative">
        <i className="bi bi-search fs-4 me-3 buscar cursor-pointer" onClick={handleSearchClick} />
        <input
          type="text" placeholder="Buscar..." 
          className={`form-control search-input ${showSearch ? "expand" : ""}`}
        />
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

          <Link to="/perfil">
            <i className="perfil bi bi-person-circle fs-4" />
          </Link>
                    
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
    </div>
  );
};

export default Header;
