import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="container py-2">
            <div className="row align-items-center">
                {/* IZQUIERDA: búsqueda */}
                <div className="col-4 d-flex justify-content-start">
                    <i className="bi bi-search fs-4 me-3" />
                    {/* Si querés agregar un input de búsqueda: */}
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
                    <i className="bi bi-cart fs-4" />
                    <Link to="/favoritos">
                        <i className="bi bi-heart fs-4" />
                    </Link>
    
                    <i className="bi bi-person-circle fs-4" />
                </div>
            </div>

            {/* Menú inferior */}
            <div className="row mt-2">
                <div className="col d-flex justify-content-around">
                    <Link to="/hombres">Hombres</Link>
                    <Link to="/mujeres">Mujeres</Link>
                    <Link to="/promociones">Promociones</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;