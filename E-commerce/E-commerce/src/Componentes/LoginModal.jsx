import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/LoginModal.css";
import HypeConColor from "../assets/Imagenes/Logo/HypeConColor.png";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de login con credenciales fijas
    if (email === "abc@abc.com" && password === "1234") {
      const user = { email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user); // Notifica al Header que el login fue exitoso
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal d-flex">
        {/* Imagen a la izquierda */}
        <div className="modal-image">
          <img src={HypeConColor} alt="Inicio Sesión" />
        </div>

        {/* Barra separadora */}
        <div className="modal-divider"></div>

        {/* Formulario a la derecha */}
        <div className="modal-form">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <h3>Iniciar Sesión</h3>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;