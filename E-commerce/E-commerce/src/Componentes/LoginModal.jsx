import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/LoginModal.css";
import HypeConColor from "../../public/Imagenes/Logo/HypeConColor.png";

// Endpoint
const API_LOGIN_URL = "http://localhost:5079/Usuario/Login";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  // Estados del form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados UI
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Submit + validación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Ejecución API
    try {
      setLoading(true);

      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await response.json();

      // Validación respuesta
      const ok = response.ok && (data?.success === true || data?.succes === true);
      if (!ok) {
        setError(data?.message || "Credenciales inválidas");
        return;
      }

      // Normalización usuario para el front
      const apiUser = data.data;
      const user = {
        ...apiUser,
        perfil_id: Number(apiUser.perfil_id),
        usuario_id: Number(apiUser.usuario_id ?? apiUser.id_usuario ?? apiUser.id),
      };

      // Notificar al padre
      onLoginSuccess?.(user);
      onClose?.();
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal d-flex">
        <div className="modal-image">
          <img src={HypeConColor} alt="Inicio Sesión" />
        </div>

        <div className="modal-divider" />

        <div className="modal-form">
          <button className="close-btn" onClick={onClose}>×</button>

          <h3>Iniciar Sesión</h3>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
