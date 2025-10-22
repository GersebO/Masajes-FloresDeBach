import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const links = [
  { to: "/", text: "🏠 Home" },
  { to: "/product", text: "🌿 Productos" },
  { to: "/aboutUs", text: "🌸 Nosotros" },
  { to: "/contact", text: "☀️ Contacto" },
  { to: "/blogs", text: "🪷 Blogs" },
  { to: "/login", text: "🔑 Iniciar Sesión" },
  { to: "/register", text: "📝 Registrar Usuario" },
  { to: "/cart", text: "🛒 Carrito" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        </ul>
      </div>
    </nav>
  );
}
