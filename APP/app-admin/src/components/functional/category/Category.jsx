import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../store/hooks/useFetch";
import "./category.css";
import { useState } from "react";


export default function Category() {
  const categories = useFetch("http://localhost:8082/api/categories");
  const [filter, setFilter] = useState("ALL");
  // Muestra mensaje mientras carga
  if (!categories) {
    return <p className="loading-text">Cargando categorías...</p>;
  }

  const categoriesNormalizados = categories.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    isActive: p.isActive === true || p.isActive === "true",
  }));
  const categoriasFiltradas =
  filter === "ALL"
    ? categoriesNormalizados
    : categoriesNormalizados.filter((c) =>
        filter === "ACTIVE" ? c.isActive : !c.isActive
      );


  // === Función para DESACTIVAR ===
  const handleDesactivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de desactivar la categoría "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8082/api/categories/${id}/deactivate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al desactivar la categoría");
        alert("✅ Categoría desactivada exitosamente");
        window.location.reload();
      } catch (error) {
        console.error("Error al desactivar:", error);
        alert("❌ Error al desactivar la categoría");
      }
    }
  };

  // === Función para ACTIVAR ===
  const handleActivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de activar la categoría "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8082/api/categories/${id}/activate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al activar la categoría");
        alert("✅ Categoría activada exitosamente");
        window.location.reload();
      } catch (error) {
        console.error("Error al activar:", error);
        alert("❌ Error al activar la categoría");
      }
    }
  };

  // === Datos resumen ===
  const total = categories.length;
  const activas = categories.filter((c) => c.isActive).length;
  const inactivas = categories.filter((c) => !c.isActive).length;

  return (
    <div className="admin-container">
      <div className="titulo-inventario">🗂️ Categorías registradas</div>

      {/* === Resumen de categorías === */}
      <div className="inventory-summary">
        <div className="summary-card">
          <h4>Total categorías</h4>
          <p>{total}</p>
        </div>
        <div className="summary-card">
          <h4>Activas</h4>
          <p>{activas}</p>
        </div>
        <div className="summary-card">
          <h4>Inactivas</h4>
          <p>{inactivas}</p>
        </div>
        <div className="summary-card create-product-card">
          <Link to="/categories/create" className="btn-create-product">
            + Crear Categoría
          </Link>
        </div>
      </div>
      {/* === Filtro === */}
      <div className="filter-container">
        <label htmlFor="filter">Filtrar por estado:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">Todas</option>
          <option value="ACTIVE">Activas</option>
          <option value="INACTIVE">Inactivas</option>
        </select>
      </div>
      {/* === Tabla de categorías === */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Status</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
              {categoriasFiltradas.length > 0 ? (
                categoriasFiltradas.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        c.isActive ? "active" : "inactive"
                      }`}
                    >
                      {c.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    {c.isActive ? (
                      <button
                        className="btn-action btn-deactivate"
                        onClick={() => handleDesactivar(c.id, c.name)}
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button
                        className="btn-action btn-activate"
                        onClick={() => handleActivar(c.id, c.name)}
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No hay categorías registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
