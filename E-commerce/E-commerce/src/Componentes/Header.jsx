import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

    return(

        <div className="container py-2">
            <div className="row align-items-center">
                <div className="col-2">
                <img src="" alt="Imagen" className="img-fluid" />
                </div>

                <div className="col text-center">
                    <h1 className="m-0 display-1">E-COMMERCE</h1>
                </div>                

                <div className="col-2 d-flex justify-content-end gap-3">
                    {/* COMO QUE ESTO ES UN COMENTARIO*/}

                    {/* Parece una boludez pero despues dentro de cada div va a redirigirte a otra vista, por eso esta hecho asi */}
                    <div className="ruta">
                        <i className="bi bi-cart"/>
                    </div>
                    <div className="ruta">
                        <i className="bi bi-heart-fill"/>
                    </div>            
                    <div className="ruta">
                        <i className="bi bi-search"/>
                    </div>                                        
                </div>
            </div>

            {/* Fila inferior: menú */}
            <div className="row mt-2">
                <div className="col d-flex justify-content-around">
                    <Link to="/hombres">Hombres</Link>
                    <Link to="/mujeres">Mujeres</Link>
                    <Link to="/promociones">Promociones</Link>
                </div>
            </div>
        </div>
            
    );
}

export default Header;
