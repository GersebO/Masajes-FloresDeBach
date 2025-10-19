import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../store/hooks/useFetch";
import "./User.css";

export default function User() {
  const users = useFetch("http://localhost:8081/api/users");
  const [filter, setFilter] = useState("ALL");

  if (!users) return <p>Cargando usuarios...</p>;

  // Normalizamos los datos según tu backend real
  const usersNormalizados = users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    status: u.status,
  }));

  // === Filtro por estado ===
  const usuariosFiltrados =
    filter === "ALL"
      ? usersNormalizados
      : usersNormalizados.filter(
          (u) =>
            (filter === "ACTIVE" && u.status === "ACTIVE") ||
            (filter === "INACTIVE" && u.status === "INACTIVE")
        );

  // === Desactivar usuario ===
  const handleDesactivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de desactivar a "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/users/${id}/deactivate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al desactivar el usuario");
        alert("Usuario desactivado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al desactivar:", error);
        alert("Error al desactivar el usuario ❌");
      }
    }
  };

  // === Activar usuario ===
  const handleActivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de activar a "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/users/${id}/activate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al activar el usuario");
        alert("Usuario activado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al activar:", error);
        alert("Error al activar el usuario ❌");
      }
    }
  };

  // === Datos resumen ===
  const total = usersNormalizados.length;
  const activos = usersNormalizados.filter((u) => u.status === "ACTIVE").length;
  const inactivos = usersNormalizados.filter((u) => u.status === "INACTIVE").length;

  return (
    <div className="table-container">
      <div className="admin-container">
        <div className="titulo-inventario">👤 Usuarios registrados</div>

        {/* === Resumen === */}
        <div className="inventory-summary">
          <div className="summary-item">
            <h3>Total Usuarios</h3>
            <p>{total}</p>
          </div>
          <div className="summary-item">
            <h3>Activos</h3>
            <p>{activos}</p>
          </div>
          <div className="summary-item">
            <h3>Inactivos</h3>
            <p>{inactivos}</p>
          </div>
          <div className="summary-item create-product-card">
            <Link to="/user/create" className="btn-create-product">
              + Crear Usuario
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
            <option value="ALL">Todos</option>
            <option value="ACTIVE">Activos</option>
            <option value="INACTIVE">Inactivos</option>
          </select>
        </div>

        {/* === Tabla === */}
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{`${u.firstName} ${u.lastName}`}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role?.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        u.status === "ACTIVE" ? "active" : "inactive"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    {u.status === "ACTIVE" ? (
                      <button
                        className="btn-deactivate"
                        onClick={() =>
                          handleDesactivar(u.id, `${u.firstName} ${u.lastName}`)
                        }
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button
                        className="btn-activate"
                        onClick={() =>
                          handleActivar(u.id, `${u.firstName} ${u.lastName}`)
                        }
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
