import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container text-center">
        <p className="footer-title">MarafloresdeBach</p>
        <p className="footer-info">© 2025 Todos los derechos reservados</p>
        <p className="footer-links">
          <Link to="/nosotros">Nosotros</Link> |
          <Link to="/contacto">Contacto</Link> |
          <Link to="/productos">Productos</Link>
        </p>
      </div>
    </footer>
  );
}
