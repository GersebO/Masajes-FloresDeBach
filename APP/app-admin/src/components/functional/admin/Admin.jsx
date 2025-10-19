import React from "react";
import AdminLayout from "../../layout/adminlayout/AdminLayout.jsx";
import "./Admin.css";

const Admin = () => {
  const today = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AdminLayout>
      <div className="admin-home">
        <div className="admin-header">
          <div className="header-text">
            <h1>🌸 Maraflores de Bach 🌸</h1>
            <p>Bienvenido al panel administrativo</p>
          </div>
          <div className="header-date">
            <p>📅 {today}</p>
          </div>
        </div>

        <div className="admin-home-cards">
          <div className="home-card">
            <span className="emoji">🛍️</span>
            <h3>Productos</h3>
            <p>Administra todos los productos disponibles en la tienda.</p>
          </div>
          <div className="home-card">
            <span className="emoji">👥</span>
            <h3>Usuarios</h3>
            <p>Gestiona las cuentas de los usuarios registrados.</p>
          </div>
          <div className="home-card">
            <span className="emoji">📂</span>
            <h3>Categorías</h3>
            <p>Administra todas las categorías disponibles en la tienda.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
