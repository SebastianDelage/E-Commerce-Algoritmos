import "../assets/styles/Home.css";

export default function Home() {
    return (
      <div className="container">
        <div className="row-md-12">
            <h1 className="display-1 mb-3 sideAnimFade">Página de Inicio</h1>
            <div className="col-md-12">
              <div class="wsk-cp-product">
                <div class="wsk-cp-img">
                  <img src="https://3.bp.blogspot.com/-eDeTttUjHxI/WVSvmI-552I/AAAAAAAAAKw/0T3LN6jABKMyEkTRUUQMFxpe6PLvtcMMwCPcBGAYYCw/s1600/001-culture-clash-matthew-gianoulis.jpg" alt="Product" class="img-responsive" />
                </div>
                <div class="wsk-cp-text">
                  <div class="category">
                    <span>T-Shirt</span>
                  </div>
                  <div class="title-product">
                    <h3>Remera Algodon BoxyFit Hype </h3>
                  </div>
                  <div class="description-prod">
                    <p>Remerita</p>
                  </div>
                  <div class="card-footer">
                    <div class="wcf-left"><span class="price">$ 150.000</span></div>
                    <div class="wcf-right"><a href="#" class="buy-btn"><i class="zmdi zmdi-shopping-basket"></i></a></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>      
    );
  }
  