// src/Vistas/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";

import Header from "../Componentes/Header.jsx";
import Favoritos from "../Vistas/Favoritos.jsx";
import Perfil from "../Vistas/Perfil.jsx";
import { CartProvider } from "../context/CartContext";

// Sistema de notificaciones personalizado
import { NotificationProvider, useNotification } from "../context/NotificationContext";
import Notification from "../Componentes/Notification.jsx";

import Back from "./Back.jsx";
import Home from "./Home.jsx";
import Hombres from "./Hombres.jsx";
import Mujeres from "./Mujeres.jsx";
import Promociones from "./Promociones.jsx";

function AppContent({ user, setUser, productos, cargando, onUpdateProducto, isAdmin }) {
  const { notification, hideNotification } = useNotification();

  return (
    <>
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              productos={productos}
              cargando={cargando}
              user={user}
              onUpdateProducto={onUpdateProducto}
            />
          }
        />
        <Route
          path="/hombres"
          element={
            <Hombres
              productos={productos}
              cargando={cargando}
              user={user}
              onUpdateProducto={onUpdateProducto}
            />
          }
        />
        <Route
          path="/mujeres"
          element={
            <Mujeres
              productos={productos}
              cargando={cargando}
              user={user}
              onUpdateProducto={onUpdateProducto}
            />
          }
        />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/favoritos" element={<Favoritos usuario={user} />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/back"
          element={isAdmin ? <Back /> : <Navigate to="/" />}
        />
      </Routes>

      {/* Notificación flotante personalizada */}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </>
  );
}

function App() {
  // Sesión global
  const [user, setUser] = useState(null);

  // Productos globales
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar productos
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5079/Producto/GetAll");
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setProductos(
            data.data.map((p) => ({ ...p, genero_id: Number(p.genero_id) }))
          );
        }
      } catch (e) {
        console.error("Error al cargar productos:", e);
      } finally {
        setCargando(false);
      }
    };

    getData();
  }, []);

  // Actualizar producto en la lista global
  const onUpdateProducto = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.producto_id === productoActualizado.producto_id ? productoActualizado : p
      )
    );
  };

  const isAdmin = Number(user?.perfil_id) === 1;

  return (
    <NotificationProvider>
      <CartProvider>
        {/* Toaster de react-hot-toast (notificaciones rápidas) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#fff",
              },
            },
          }}
        />

        <Router>
          <AppContent
            user={user}
            setUser={setUser}
            productos={productos}
            cargando={cargando}
            onUpdateProducto={onUpdateProducto}
            isAdmin={isAdmin}
          />
        </Router>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;