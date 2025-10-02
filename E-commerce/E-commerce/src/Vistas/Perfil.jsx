import React from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Borra la sesión
    navigate("/"); // Redirige al home
    window.location.reload(); // Recarga para que el Header detecte el cambio
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Perfil</h1>
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Bienvenido, {user?.email || "Usuario"}</h5>
            <button className="btn btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;