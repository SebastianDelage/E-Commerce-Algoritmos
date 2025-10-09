import "../assets/styles/Home.css";
import Integracion from "./Integracion";

export default function Home() {
  return (
    <div className="container">
      <div className="row-md-12">
        <h1 className="display-1 mb-3 sideAnimFade">Página de Inicio</h1>
        <Integracion />
      </div>
    </div>
  );
}