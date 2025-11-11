import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCustomerStore } from "../../../store/zustand/user.store";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { customer, isAuthenticated, logout } = useCustomerStore();
  const navigate = useNavigate();

  const links = [
    { to: "/", text: "🏠 Home" },
    { to: "/product", text: "🌿 Productos" },
    { to: "/appointment", text: "📅 Agendar" },
    { to: "/aboutUs", text: "🌸 Nosotros" },
    { to: "/contact", text: "☀️ Contacto" },
    { to: "/blogs", text: "🪷 Blogs" },
    { to: "/cart", text: "🛒 Carrito" },
  ];

  const authLinks = [
    { to: "/invoices", text: "📄 Mis Boletas" },
  ];

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
      navigate("/");
      setIsOpen(false);
    }
  };

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

          {/* Enlaces solo para usuarios autenticados */}
          {isAuthenticated && authLinks.map((link) => (
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
              <span className="user-greeting">
                <i className="bi bi-person-circle"></i>
                Hola, {customer?.firstName || customer?.email}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
