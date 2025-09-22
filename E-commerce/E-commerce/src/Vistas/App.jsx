import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Componentes/Header.jsx";


import Home from "./Home.jsx";
import Hombres from "./Hombres.jsx";
import Mujeres from "./Mujeres.jsx";
import Promociones from "./Promociones.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hombres" element={<Hombres />} />
        <Route path="/mujeres" element={<Mujeres />} />
        <Route path="/promociones" element={<Promociones />} />
      </Routes>
    </Router>
  );
}

export default App;
