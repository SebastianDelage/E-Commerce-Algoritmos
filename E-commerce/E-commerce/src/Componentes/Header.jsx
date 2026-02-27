import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas, Nav } from 'react-bootstrap';

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
  const [showMenu, setShowMenu] = useState(false);

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
  const handleMenuClick = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);

  return (
    <div className="container py-2">
      <div className="row align-items-center">
        {/* Menu +Buscador */}
        <div className="col-4 d-flex align-items-center gap-3">
          {/* Menú hamburguesa - solo ícono */}
          <i 
            className="bi bi-list fs-3 cursor-pointer menu-icon" 
            onClick={handleMenuClick}
            style={{ fontSize: '1.8rem' }} // un toque más grande y visible
          />

          {/* Buscador */}
          <div className="position-relative flex-grow-1">
            <i 
              className="bi bi-search fs-4 buscar cursor-pointer position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              onClick={handleSearchClick}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className={`form-control ps-5 search-input ${showSearch ? "expand" : ""}`}
            />
          </div>
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

      {/* Offcanvas Menú (solo se abre con el ícono hamburguesa) */}
      <Offcanvas 
        show={showMenu} 
        onHide={handleCloseMenu} 
        placement="start"
        className="hype-offcanvas-white" 
      >
        <Offcanvas.Header closeButton closeButtonClassName="btn-close-white">
          <Offcanvas.Title className="fs-3 fw-bold">HYPE</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3 fs-5">
            <Nav.Link as={Link} to="/hombres" onClick={handleCloseMenu} className="text-white py-3 border-bottom border-secondary">
              Hombres
            </Nav.Link>
            <Nav.Link as={Link} to="/mujeres" onClick={handleCloseMenu} className="text-white py-3 border-bottom border-secondary">
              Mujeres
            </Nav.Link>
            <Nav.Link as={Link} to="/promociones" onClick={handleCloseMenu} className="text-white py-3 border-bottom border-secondary">
              Promociones
            </Nav.Link>
            <Nav.Link as={Link} to="/infoHype" onClick={handleCloseMenu} className="text-white py-3 border-bottom border-secondary">
              Quiénes somos?
            </Nav.Link>
            <hr className="my-4 border-secondary" />
            {user ? (
              <>
                <Nav.Link as={Link} to="/perfil" onClick={handleCloseMenu} className="text-white">
                  Mi Perfil
                </Nav.Link>
                <Nav.Link as={Link} to="/favoritos" onClick={handleCloseMenu} className="text-white">
                  Favoritos
                </Nav.Link>
              </>
            ) : (
              <Nav.Link 
                onClick={() => { setShowLoginModal(true); handleCloseMenu(); }} 
                className="text-white"
              >
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

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
