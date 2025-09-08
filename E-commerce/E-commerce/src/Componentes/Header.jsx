import "./Header.css";
import { Link } from 'react-router-dom';


const Navbar = () => {

    return(

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          E-Commerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* Categoría 1 */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="categoria1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hombre
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoria1">
                <li><Link className="dropdown-item" to="/categoria/auriculares">Auriculares</Link></li>
                <li><Link className="dropdown-item" to="/categoria/monitores">Monitores</Link></li>
                <li><Link className="dropdown-item" to="/categoria/teclados">Teclados</Link></li>
              </ul>
            </li>

            {/* Categoría 2 */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="categoria2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mujer
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoria2">
                <li><Link className="dropdown-item" to="/categoria/camperas">Camperas</Link></li>
                <li><Link className="dropdown-item" to="/categoria/zapatillas">Zapatillas</Link></li>
                <li><Link className="dropdown-item" to="/categoria/remeras">Remeras</Link></li>
              </ul>
            </li>

            {/* Categoría 3 */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="categoria3"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Niños
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoria3">
                <li><Link className="dropdown-item" to="/categoria/decoracion">Decoración</Link></li>
                <li><Link className="dropdown-item" to="/categoria/iluminacion">Iluminación</Link></li>
                <li><Link className="dropdown-item" to="/categoria/muebles">Muebles</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    );
}

export default Header;