import React, { useEffect, useState } from "react";
import "./Admin.css";

export default function Admin() {
  const [stats, setStats] = useState({
    customers: 0,
    users: 0,
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resCustomers, resUsers, resProducts, resCategories] =
          await Promise.all([
            fetch("http://localhost:8081/api/customers"),
            fetch("http://localhost:8081/api/users"),
            fetch("http://localhost:8082/api/products"),
            fetch("http://localhost:8082/api/categories"),
          ]);

        const customers = await resCustomers.json();
        const users = await resUsers.json();
        const products = await resProducts.json();
        const categories = await resCategories.json();

        setStats({
          customers: customers.length,
          users: users.length,
          products: products.length,
          categories: categories.length,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-dashboard">
      <h1 className="titulo-inventario">Bienvenido al panel administrativo</h1>

      <p className="admin-welcome">
        👋 ¡Hola, Administrador! Hoy es <strong>{today}</strong>.  
        Esperamos que tengas un día productivo 🌼
      </p>

      <div className="cards-container">
        <div className="summary-card">
          <h2>👥 Customers</h2>
          <p>{stats.customers}</p>
        </div>

        <div className="summary-card">
          <h2>👤 Usuarios</h2>
          <p>{stats.users}</p>
        </div>

        <div className="summary-card">
          <h2>🛍️ Productos</h2>
          <p>{stats.products}</p>
        </div>

        <div className="summary-card">
          <h2>📦 Categorías</h2>
          <p>{stats.categories}</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>Resumen rápido</h3>
        <ul>
          <li>📦 <strong>{stats.products}</strong> productos activos en la tienda</li>
          <li>👥 <strong>{stats.customers}</strong> clientes registrados</li>
          <li>💬 Última actualización: {new Date().toLocaleTimeString()}</li>
        </ul>
      </div>
    </div>
  );
}
