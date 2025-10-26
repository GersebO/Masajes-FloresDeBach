import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div >
        <p className="footer-title">MarafloresdeBach</p>
        <p className="footer-info">© 2025 Todos los derechos reservados</p>
        <p className="footer-links">
          <Link to="/aboutUs">Nosotros</Link> |
          <Link to="/contact">Contacto</Link> |
          <Link to="/product">Productos</Link>
        </p>
      </div>
    </footer>
  );
}
