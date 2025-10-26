import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCustomerStore } from "../../../store/zustand/user.store";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { customer, isAuthenticated, logout } = useCustomerStore();

  const links = [
    { to: "/", text: "🏠 Home" },
    { to: "/product", text: "🌿 Productos" },
    { to: "/aboutUs", text: "🌸 Nosotros" },
    { to: "/contact", text: "☀️ Contacto" },
    { to: "/blogs", text: "🪷 Blogs" },
    { to: "/cart", text: "🛒 Carrito" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/img/logo.png" alt="Logo MarafloresdeBach" />
          <span>MarafloresdeBach</span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Enlaces */}
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                className="nav-link"
                to={link.to}
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            </li>
          ))}

          {/* Mostrar según sesión */}
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                  🔑 Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>
                  📝 Registrar Usuario
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-user">
              <span>👋 Hola, {customer?.firstName}</span>
              <button className="logout-btn" onClick={logout}>
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
