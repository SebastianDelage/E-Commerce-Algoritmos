import "../assets/styles/Home.css";

export default function Home() {
    return (
      <div className="container">
        <div className="row-md-12">
            <h1 className="display-1 mb-3 sideAnimFade">Página de Inicio</h1>
            <div className="col-md-12">
              <div className="wsk-cp-product">
                <div className="wsk-cp-img">
                  <img src="../assets/Imagenes/Hombre/top/remeranegra.jpg" alt="Product" className="img-responsive" />
                  
                </div>
                <div className="wsk-cp-text">
                  <div className="category">
                    <span>T-Shirt</span>
                  </div>
                  <div className="title-product">
                    <h3>Remera Algodon BoxyFit Hype </h3>
                  </div>
                  <div className="description-prod">
                    <p>Remerita</p>
                  </div>
                  <div className="card-footer">
                    <div className="wcf-left"><span className="price">$ 150.000</span></div>
                    <div className="wcf-right"><a href="#" className="buy-btn"><i className="zmdi zmdi-shopping-basket"></i></a></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>      
    );
  }
  