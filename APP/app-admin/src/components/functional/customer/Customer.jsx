import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../store/hooks/useFetch";
import "./customer.css";

export default function Customer() {
  const customers = useFetch("http://localhost:8081/api/customers");
  const [filter, setFilter] = useState("ALL");

  if (!customers) {
    return <p>Cargando clientes...</p>;
  }

  // === Normalizamos ===
  const customersNormalizados = customers.map((c) => ({
    id: c.id,
    run: c.run,
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    phone: c.phone,
    status: c.status,
  }));

  // === Filtro ===
  const clientesFiltrados =
    filter === "ALL"
      ? customersNormalizados
      : customersNormalizados.filter(
          (c) =>
            (filter === "ACTIVE" && c.status === "ACTIVE") ||
            (filter === "INACTIVE" && c.status === "INACTIVE")
        );

  // === Función para DESACTIVAR ===
  const handleDesactivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de desactivar al cliente "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/customers/${id}/deactivate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al desactivar el cliente");
        alert("Cliente desactivado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al desactivar:", error);
        alert("Error al desactivar el cliente ❌");
      }
    }
  };

  // === Función para ACTIVAR ===
  const handleActivar = async (id, name) => {
    if (window.confirm(`¿Estás seguro de activar al cliente "${name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/customers/${id}/activate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al activar el cliente");
        alert("Cliente activado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al activar:", error);
        alert("Error al activar el cliente ❌");
      }
    }
  };

  // === Datos resumen ===
  const total = customersNormalizados.length;
  const activos = customersNormalizados.filter(
    (c) => c.status === "ACTIVE"
  ).length;
  const inactivos = customersNormalizados.filter(
    (c) => c.status === "INACTIVE"
  ).length;

  return (
    <div className="table-container">
      <div className="admin-container">
        <div className="titulo-inventario">👤 Clientes registrados</div>

        {/* === Resumen === */}
        <div className="inventory-summary">
          <div className="summary-card">
            <h4>Total clientes</h4>
            <p>{total}</p>
          </div>
          <div className="summary-card">
            <h4>Activos</h4>
            <p>{activos}</p>
          </div>
          <div className="summary-card">
            <h4>Inactivos</h4>
            <p>{inactivos}</p>
          </div>
          <div className="summary-card create-product-card">
            <Link to="/customer/create" className="btn-create-product">
              + Crear Cliente
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
              <th>Run</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Status</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.run}</td>
                  <td>{`${c.firstName} ${c.lastName}`}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        c.status === "ACTIVE" ? "active" : "inactive"
                      }`}
                    >
                      {c.status === "ACTIVE" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    {c.status === "ACTIVE" ? (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDesactivar(c.id, `${c.firstName} ${c.lastName}`)
                        }
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          handleActivar(c.id, `${c.firstName} ${c.lastName}`)
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
                <td colSpan="7">No hay clientes registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
