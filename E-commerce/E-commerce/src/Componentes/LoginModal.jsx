import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/LoginModal.css";
import HypeConColor from "../../public/Imagenes/Logo/HypeConColor.png";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5079/Usuario/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Credenciales inválidas");
      }

      // ✅ Acceder correctamente a la estructura del backend
      const { token, usuario } = result.data;

      const user = {
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.perfil.toLowerCase(),
      };

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLoginSuccess(user);
    } catch (err) {
      setError(err.message);
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
