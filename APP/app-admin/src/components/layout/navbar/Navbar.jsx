import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Botón de menú móvil */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">🌸 Panel Admin</h2>
          {user && (
            <div className="sidebar-user-info">
              <i className="bi bi-person-circle"></i>
              <span className="user-name">{user.firstName || user.email}</span>
            </div>
          )}
        </div>
        
        <ul className="sidebar-menu">
          <li>
            <Link to="/home" className="nav-btn">
              🏠 Admin Home
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-btn">
              🛍️ Productos
            </Link>
          </li>
          <li>
            <Link to="/product/create" className="nav-btn">
              ➕ Crear Producto
            </Link>
          </li>
          <li>
            <Link to="/categories" className="nav-btn">
              📦 Categoría
            </Link>
          </li>
         <li>
            <Link to="/categories/create" className="nav-btn">
              ➕ Crear Categoría
            </Link>
          </li>
          
          <li>
            <Link to="/user" className="nav-btn">
              👥 Usuarios
            </Link>
          </li>
          <li>
            <Link to="/user/create" className="nav-btn">
              🧩 Crear Usuario
            </Link>
          </li>
          <li>
            <Link to="/customer" className="nav-btn">
              👥 Clientes
            </Link>
          </li> 
          <li>
            <Link to="/customer/create" className="nav-btn">
              🧩 Crear Cliente
            </Link>
          </li>
          <li className="return-link">
            <a href="http://localhost:5174" className="nav-btn">
              🔙 Volver a la tienda
            </a>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="bi bi-box-arrow-left"></i>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Overlay fuera del nav para cubrir toda la pantalla */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </>
  );
}
