import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/LoginModal.css";
import HypeConColor from "../../public/Imagenes/Logo/HypeConColor.png";

const API_LOGIN_URL = "http://localhost:5079/Usuario/Login";




const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const loginUser = async () => {
      try {
        setLoading(true);

        console.log("Enviando datos de login:", {
          email,
          contraseña: password,
        });

        const response = await fetch(API_LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            contraseña: password, // 👈 COINCIDE CON EL MODELO DEL BACK
          }),
        });

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        // Validación de error API
        if (!response.ok || !data.success) {
          setError(data.message || "Credenciales inválidas");
          return;
        }

        // Usuario devuelto por la API
        const apiUser = data.data;

        // Preparamos user para el front
        const user = {
          ...apiUser,
          role: apiUser.perfilNombre || apiUser.PerfilNombre || null,
        };

        // Guardamos en localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Avisamos al padre que el login fue exitoso
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(user);
        }

        // Cerramos el modal
        if (typeof onClose === "function") {
          onClose();
        }
      } catch (error) {
        console.error("Error al enviar login:", error);
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal d-flex">
        <div className="modal-image">
          <img src={HypeConColor} alt="Inicio Sesión" />
        </div>

        <div className="modal-divider"></div>

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

            <button type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
