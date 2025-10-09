import "../assets/styles/ProductItem.css";

export default function Hombres() {
    return (
      <div className="container">
        <div className="row">
          <div className="col productCardAddCol">
            <div className="row">              
              <div className="productCardAdd align-content-center">
                <div className="squarePlus">
                  <p className="productCard-text"><i className="bi bi-plus-lg"></i></p>
                </div>
              </div>              
            </div>
            <div className="row">
              <div className="col productCard-subtitle">
                <div className="productCard-subtitle-circle">
                  <p className="productCard-subtitle-text">Cargar Producto</p>          
                </div>                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  