import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../../store/services/customer.service";
import { getAllUsers } from "../../../store/services/user.service";
import { getAllProducts } from "../../../store/services/product.service";
import { getAllCategories } from "../../../store/services/category.service";
import "./Admin.css";

export default function Admin() {
  const [stats, setStats] = useState({
    customers: 0,
    users: 0,
    products: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Usar los servicios con autenticación
        const [customers, users, products, categories] = await Promise.all([
          getAllCustomers(),
          getAllUsers(),
          getAllProducts(),
          getAllCategories(),
        ]);

        setStats({
          customers: customers.length,
          users: users.length,
          products: products.length,
          categories: categories.length,
        });
        
        setError(null);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
        setError("Error al cargar las estadísticas");
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="admin-dashboard">
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#6a1b9a" }}>
          Cargando estadísticas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#d32f2f" }}>
          {error}
        </p>
      </div>
    );
  }

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
